import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.scss', '../../../shared/styles/buttons.scss']
})
export class AddToCartButtonComponent {
  @Input() public cartButtonPressed: boolean = false;
  @Input() public stock: number = 1;

  public addToCartCount: number = 1;
}
