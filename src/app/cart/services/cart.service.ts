import {DestroyRef, inject, Injectable} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Cart} from "../../shared/models/cart.model";
import {CartEntry} from "../../shared/models/cart-entry.model";
import {BehaviorSubject, fromEvent, Observable, of} from "rxjs";
import {catchError, filter, map, switchMap} from "rxjs/operators";
import {ProductService} from "../../products/services/product.service";
import {UserService} from "../../auth/services/user.service";
import {APP_CONSTANTS} from "../../shared/constants/app.constants";
import {User} from "../../shared/models/user.model";
import {CartDataService} from "./cart-data.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartDataService: CartDataService = inject(CartDataService);
  private cartSubject = new BehaviorSubject<Cart>({products: []} as unknown as Cart);
  public cart$: Observable<Cart> = this.cartSubject.asObservable();
  private CART_SYNC_EVENT = "CART_SYNC_EVENT";
  private productService: ProductService = inject(ProductService);
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.userService.loggedUser$
      .pipe(takeUntilDestroyed())
      .subscribe(user => {
        this.loadCart(user);
      });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => {
      this.loadCart(this.userService.getCurrentUser());
    });

    fromEvent<StorageEvent>(window, 'storage')
      .pipe(takeUntilDestroyed())
      .subscribe(event => {
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
    const startIndex = (pageNumber - 1) * entriesPerPage;
    return entries.slice(startIndex, startIndex + entriesPerPage);
  }

  public getTotalPages(entriesPerPage: number): number {
    const entries = this.getEntries();
    return Math.ceil(entries.length / entriesPerPage);
  }

  public setNewQuantityForEntry(productId: string, quantity: number): Observable<boolean> {
    if (quantity === 0) {
      return this.removeEntry(productId);
    }
    let entries = this.getEntries();
    if (!entries) {
      entries = [];
      this.cartSubject.next({
        ...this.cartSubject.value,
        products: entries
      });
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

    return this.cartDataService.updateCartOrCreateNewIfNotExist(currentCart).pipe(
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
    this.cartDataService.getCartByUserId(userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (cart) => {
          if (cart) {
            this.cartSubject.next(cart);
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
      this.cartDataService.getCartById(guestCartId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
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
