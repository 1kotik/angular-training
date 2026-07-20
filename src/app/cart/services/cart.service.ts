import {inject, Injectable} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {ApiService} from "../../shared/services/api.service";
import {Cart} from "../../shared/models/cart.model";
import {CartEntry} from "../../shared/models/cart-entry.model";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductService} from "../../products/services/product.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiService: ApiService = inject(ApiService);
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject({} as Cart);
  public cart$: Observable<Cart> = this.cartSubject.asObservable();
  private ENTITY_NAME = "cart";
  private productService: ProductService = inject(ProductService);

  constructor() {
    this.loadCart();
  }

  public loadCart() {
    let userId = 1;
    let httpParams = new HttpParams().set('userId', userId);
    this.apiService.get<Cart[]>(this.ENTITY_NAME, httpParams).subscribe(cart => {
      this.cartSubject.next(cart[0]);
    });
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
    this.apiService.updateById(this.ENTITY_NAME, this.cartSubject.value.id, this.cartSubject.value)
      .subscribe(cart => {
        if (cart) {
          this.cartSubject.next(cart);
        }
      });
  }

  private getEntries(): CartEntry[] {
    return this.cartSubject.value.products;
  }
}
