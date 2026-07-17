import {Component, inject, Input} from '@angular/core';
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

  public product$!: Observable<Product>;
  private readonly productService = inject(ProductService);
  public productAvailability$!: Observable<any>;

  @Input() set productId(id: number) {
    this.product$ = this.productService.getById(id);
    this.productAvailability$ = this.product$.pipe(
      map(product => this.computeProductAvailability(product.stock))
    );
  }

  public computeProductAvailability(stock: number) {
    if (stock > 9) {
      return PRODUCT_AVAILABILITY.IN_STOCK;
    }
    if (stock > 0) {
      return PRODUCT_AVAILABILITY.ALMOST_SOLD_OUT;
    }
    return PRODUCT_AVAILABILITY.OUT_OF_STOCK;
  }
}
