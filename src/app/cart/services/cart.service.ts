import {inject, Injectable} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {ApiService} from "../../shared/services/api.service";
import {Cart} from "../../shared/models/cart.model";
import {CartEntry} from "../../shared/models/cart-entry.model";
import {BehaviorSubject, fromEvent, Observable} from "rxjs";
import {ProductService} from "../../products/services/product.service";
import {UserService} from "../../auth/services/user.service";
import {APP_CONSTANTS} from "../../shared/constants/app.constants";
import {User} from "../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiService: ApiService = inject(ApiService);
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject({products: []} as unknown as Cart);
  public cart$: Observable<Cart> = this.cartSubject.asObservable();
  private ENTITY_NAME = "cart";
  private productService: ProductService = inject(ProductService);
  private userService: UserService = inject(UserService);

  constructor() {
    fromEvent<StorageEvent>(window, 'storage').subscribe(event => {
      let key = event.key;
      if (key === APP_CONSTANTS.USER_KEY) {
        let userString = localStorage.getItem(key);
        let user = userString ? JSON.parse(userString) : undefined;
        this.loadCart(user);
      } else if (key === APP_CONSTANTS.GUEST_CART_ID_KEY) {
        this.loadCart()
      }
    })

    this.userService.loggedUser$.subscribe(user => {
      this.loadCart(user);
    })

    fromEvent(window, 'focus').subscribe(() => {
      let userString = localStorage.getItem(APP_CONSTANTS.USER_KEY);
      let user = userString ? JSON.parse(userString) : undefined;
      this.loadCart(user);
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
    let entries = this.getEntries();
    if (!entries) {
      return [];
    }
    let startIndex = (pageNumber - 1) * entriesPerPage;
    return entries.slice(startIndex, startIndex + entriesPerPage);
  }

  public getTotalPages(entriesPerPage: number): number {
    let entries = this.getEntries();
    if (!entries) {
      return 0;
    }
    return Math.ceil(entries.length / entriesPerPage);
  }

  public setNewQuantityForEntry(productId: string, quantity: number): void {
    if (quantity === 0) {
      this.removeEntry(productId);
      return;
    }
    let entries = this.getEntries();
    if (!entries) {
      return;
    }
    let entry = entries.find(product => productId === product.id);
    if (entry) {
      entry.count = quantity;
      this.updateCart();
    } else {
      this.productService.getById(productId).subscribe(product => {
        if (product) {
          let newEntry: CartEntry = {
            id: productId,
            title: product.title,
            count: quantity,
            price: product.price
          }
          entries.push(newEntry);
          this.updateCart();
        }
      });
    }
  }

  public removeEntry(entryId: string): void {
    let entries = this.getEntries();
    if (!entries) {
      return;
    }
    this.cartSubject.value.products = entries.filter(entry => entryId !== entry.id);
    this.updateCart();
  }

  private updateCart(): void {
    let cartId = this.cartSubject.value.id;
    if (cartId) {
      this.apiService.updateById(this.ENTITY_NAME, cartId, this.cartSubject.value)
        .subscribe(cart => {
          if (cart) {
            this.cartSubject.next(cart);
          }
        });
    }
  }

  private getEntries(): CartEntry[] {
    return this.cartSubject.value?.products || [];
  }

  private loadCartForLoggedInUser(userId: string) {
    let httpParams = new HttpParams().set('userId', userId);
    this.apiService.get<Cart[]>(this.ENTITY_NAME, httpParams).subscribe({
      next: (carts) => {
        if (carts && carts.length > 0) {
          this.cartSubject.next(carts[0]);
        } else {
          this.createCartForLoggedInUser(userId);
        }
      },
      error: () => {
        this.createCartForLoggedInUser(userId);
      }
    });
  }

  private loadCartForGuestUser() {
    let guestCartId = localStorage.getItem(APP_CONSTANTS.GUEST_CART_ID_KEY);
    if (guestCartId) {
      this.apiService.getById<Cart>(this.ENTITY_NAME, guestCartId).subscribe({
        next: (cart) => {
          if (cart) {
            this.cartSubject.next(cart);
          } else {
            this.createCartForGuestUser();
          }
        },
        error: () => {
          this.createCartForGuestUser();
        }
      })
    } else {
      this.createCartForGuestUser();
    }
  }

  private createCartForLoggedInUser(userId: string): void {
    if (userId) {
      let newCart = {
        userId: userId,
        products: []
      }
      this.apiService.post<Cart>(this.ENTITY_NAME, newCart).subscribe(cart => {
        if (cart) {
          this.cartSubject.next(cart);
        }
      })
    }
  }

  private createCartForGuestUser(): void {
    let newCart = {
      userId: 'guest',
      products: []
    }
    this.apiService.post<Cart>(this.ENTITY_NAME, newCart).subscribe(cart => {
      if (cart && cart.id) {
        localStorage.setItem(APP_CONSTANTS.GUEST_CART_ID_KEY, cart.id);
        this.cartSubject.next(cart);
      }
    })
  }
}
