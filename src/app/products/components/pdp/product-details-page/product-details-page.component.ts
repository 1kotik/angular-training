import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss'
})
export class ProductDetailsPageComponent {
  private _productId!: number

  @Input() set id(productId: number) {
    this._productId = productId;
  }

  public get productId() {
    return this._productId;
  }
}
