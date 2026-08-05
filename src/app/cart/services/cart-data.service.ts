import {inject, Injectable} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Cart} from "../../shared/models/cart.model";
import {map, Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  private ENTITY_NAME = "cart";
  private apiService: ApiService = inject(ApiService);

  public updateCartOrCreateNewIfNotExist(cart: Cart): Observable<Cart> {
    const cartId = cart.id;
    return cartId ? this.updateCartById(cart, cartId) : this.createCart(cart);
  }

  public updateCartById(cart: Cart, cartId: string): Observable<Cart> {
    return this.apiService.updateById<Cart>(this.ENTITY_NAME, cartId, cart);
  }

  public createCart(cart: Cart): Observable<Cart> {
    return this.apiService.post<Cart>(this.ENTITY_NAME, cart);
  }

  public getCartByUserId(userId: string): Observable<Cart | null> {
    const httpParams = new HttpParams().set('userId', userId);
    return this.apiService.get<Cart[]>(this.ENTITY_NAME, httpParams).pipe(map(carts => {
      if (carts && carts.length > 0) {
        return carts[0];
      } else {
        return null;
      }
    }));
  }

  public getCartById(id: string): Observable<Cart> {
    return this.apiService.getById<Cart>(this.ENTITY_NAME, id);
  }
}
