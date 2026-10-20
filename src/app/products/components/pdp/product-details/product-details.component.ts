import {Component, Input} from '@angular/core';
import {Product} from "../../../../shared/models/product.model";

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  private _product!: Product;

  @Input() set product(product: Product) {
    this._product = product;
  }

  public get product() {
    return this._product;
  }
}
