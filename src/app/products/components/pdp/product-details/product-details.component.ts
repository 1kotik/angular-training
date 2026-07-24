import {Component, inject, Input, OnInit} from '@angular/core';
import {Product} from "../../../../shared/models/product.model";
import {ProductService} from "../../../services/product.service";
import {map, Observable} from "rxjs";
import {PRODUCT_AVAILABILITY} from "../../../../shared/components/stock-availability/stock-availability.component";

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
