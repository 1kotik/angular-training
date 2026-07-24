import {Component, inject, Input} from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../../../shared/models/product.model";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss'
})
export class ProductDetailsPageComponent {
  private productService: ProductService = inject(ProductService);
  private _productId!: string
  public product$!: Observable<Product>;

  @Input() set id(productId: string) {
    this._productId = productId;
    this.product$ = this.productService.getById(productId);
  }

  public get productId() {
    return this._productId;
  }
}
