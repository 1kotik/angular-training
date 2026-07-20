import {Component, inject, Input, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.scss', '../../../shared/styles/buttons.scss']
})
export class AddToCartButtonComponent implements OnInit {
  @Input() public cartButtonPressed: boolean = false;
  @Input() public stock: number = 1;
  @Input() public productId: string = '';
  public addToCartCount: number = 0;
  private cartService: CartService = inject(CartService);

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      if(cart && cart.products) {
        let product = cart.products.find(entry => entry.id === this.productId);
        if (product) {
          this.addToCartCount = product.count;
        }
      }
    })
  }

  public addToCartPressed(): void {
    this.cartButtonPressed = true;
    if (this.addToCartCount < this.stock) {
      this.changeQuantityInCart(this.addToCartCount + 1);
    }
  }

  public changeQuantityInCart(newQuantity: number): void {
    this.addToCartCount = newQuantity;
    this.cartService.setNewQuantityForEntry(this.productId, newQuantity);
  }
}
