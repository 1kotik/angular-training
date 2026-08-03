import { inject, Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";
import { ApiService } from "../../shared/services/api.service";
import { Cart } from "../../shared/models/cart.model";
import { CartEntry } from "../../shared/models/cart-entry.model";
import { BehaviorSubject, fromEvent, Observable, of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { ProductService } from "../../products/services/product.service";
import { UserService } from "../../auth/services/user.service";
import { APP_CONSTANTS } from "../../shared/constants/app.constants";
import { User } from "../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiService: ApiService = inject(ApiService);
  private cartSubject = new BehaviorSubject<Cart>({ products: [] } as unknown as Cart);
  public cart$: Observable<Cart> = this.cartSubject.asObservable();
  private ENTITY_NAME = "cart";
  private CART_SYNC_EVENT = "CART_SYNC_EVENT";
  private productService: ProductService = inject(ProductService);
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);

  constructor() {
    this.userService.loggedUser$.subscribe(user => {
      this.loadCart(user);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadCart(this.userService.getCurrentUser());
    });

    fromEvent<StorageEvent>(window, 'storage').subscribe(event => {
      if (event.key === APP_CONSTANTS.GUEST_CART_ID_KEY && event.newValue) {
        this.loadCartForGuestUser();
      }
      if (event.key === this.CART_SYNC_EVENT) {
        this.loadCart(this.userService.getCurrentUser());
      }
    });
  }

  public loadCart(user?: User) {
    if (user && user.id) {
      this.loadCartForLoggedInUser(user.id);
    } else {
      this.loadCartForGuestUser();
    }
  }

  public getPage(pageNumber: number, entriesPerPage: number): CartEntry[] {
    const entries = this.getEntries();
    if (!entries) {
      return [];
    }
    const startIndex = (pageNumber - 1) * entriesPerPage;
    return entries.slice(startIndex, startIndex + entriesPerPage);
  }

  public getTotalPages(entriesPerPage: number): number {
    const entries = this.getEntries();
    if (!entries) {
      return 0;
    }
    return Math.ceil(entries.length / entriesPerPage);
  }

  public setNewQuantityForEntry(productId: string, quantity: number): Observable<boolean> {
    if (quantity === 0) {
      return this.removeEntry(productId);
    }
    let entries = this.getEntries();
    if (!entries) {
      entries = [];
      this.cartSubject.value.products = entries;
    }
    const entry = entries.find(product => productId === product.id);
    if (entry) {
      entry.count = quantity;
      return this.updateCart();
    } else {
      return this.productService.getById(productId).pipe(
        switchMap(product => {
          if (product) {
            const newEntry: CartEntry = {
              id: productId,
              title: product.title,
              count: quantity,
              price: product.price
            };
            entries.push(newEntry);
            return this.updateCart();
          }
          return of(false);
        }),
        catchError(() => of(false))
      );
    }
  }

  public removeEntry(entryId: string): Observable<boolean> {
    const entries = this.getEntries();
    if (!entries) {
      return of(false);
    }
    this.cartSubject.value.products = entries.filter(entry => entryId !== entry.id);
    return this.updateCart();
  }

  private updateCart(): Observable<boolean> {
    const currentCart = this.cartSubject.value;
    const cartId = currentCart.id;

    const request$ = cartId
      ? this.apiService.updateById<Cart>(this.ENTITY_NAME, cartId, currentCart)
      : this.apiService.post<Cart>(this.ENTITY_NAME, currentCart);

    return request$.pipe(
      map(cart => {
        if (cart) {
          if (!cartId && cart.id && cart.userId === 'guest') {
            localStorage.setItem(APP_CONSTANTS.GUEST_CART_ID_KEY, cart.id);
          }
          this.cartSubject.next(cart);
          localStorage.setItem(this.CART_SYNC_EVENT, Date.now().toString());
          return true;
        }
        return false;
      }),
      catchError(err => {
        console.error("Error occurred while updating cart", err);
        return of(false);
      })
    );
  }

  private getEntries(): CartEntry[] {
    return this.cartSubject.value?.products || [];
  }

  private loadCartForLoggedInUser(userId: string) {
    const httpParams = new HttpParams().set('userId', userId);
    this.apiService.get<Cart[]>(this.ENTITY_NAME, httpParams).subscribe({
      next: (carts) => {
        if (carts && carts.length > 0) {
          this.cartSubject.next(carts[0]);
        } else {
          this.initLocalEmptyCart(userId);
        }
      },
      error: () => {
        this.initLocalEmptyCart(userId);
      }
    });
  }

  private loadCartForGuestUser() {
    const guestCartId = localStorage.getItem(APP_CONSTANTS.GUEST_CART_ID_KEY);
    if (guestCartId) {
      this.apiService.getById<Cart>(this.ENTITY_NAME, guestCartId).subscribe({
        next: (cart) => {
          if (cart) {
            this.cartSubject.next(cart);
          } else {
            this.initLocalEmptyCart('guest');
          }
        },
        error: () => {
          this.initLocalEmptyCart('guest');
        }
      });
    } else {
      this.initLocalEmptyCart('guest');
    }
  }

  private initLocalEmptyCart(userId: string): void {
    const localCart: Cart = {
      userId: userId,
      products: []
    };
    this.cartSubject.next(localCart);
  }
}
