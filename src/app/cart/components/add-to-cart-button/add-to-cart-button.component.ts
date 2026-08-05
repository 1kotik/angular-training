import {Component, DestroyRef, inject, Input, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.scss', '../../../shared/styles/buttons.scss']
})
export class AddToCartButtonComponent implements OnInit {
  @Input() public cartButtonPressed = false;
  @Input() public stock = 1;
  @Input() public productId = '';
  public addToCartCount = 0;
  private cartService: CartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.cartService.cart$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(cart => {
        if (cart && cart.products) {
          const product = cart.products.find(entry => entry.id === this.productId);
          if (product) {
            this.addToCartCount = product.count;
            this.cartButtonPressed = true;
          } else {
            this.addToCartCount = 0;
            this.cartButtonPressed = false;
          }
        } else {
          this.addToCartCount = 0;
          this.cartButtonPressed = false;
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
    const previousQuantity = this.addToCartCount;
    this.addToCartCount = newQuantity;

    this.cartService.setNewQuantityForEntry(this.productId, newQuantity)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(isSuccess => {
        if (!isSuccess) {
          this.addToCartCount = previousQuantity;
          if (previousQuantity === 0) {
            this.cartButtonPressed = false;
          }
          alert("Unexpected error occurred while adding to cart");
        }
      });
  }
}
