import {Component, inject} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {PLPSearchService} from "../../../services/plp-search.service";
import {map, Observable} from "rxjs";
import {Product} from "../../../../shared/models/product.model";

@Component({
  selector: 'app-product-listing-page',
  templateUrl: './product-listing-page.component.html',
  styleUrl: './product-listing-page.component.scss'
})
export class ProductListingPageComponent {
  private productService: ProductService = inject(ProductService);
  public plpSearchService: PLPSearchService = inject(PLPSearchService);

  public get products$(): Observable<Product[]> {
    return this.productService.products;
  }

  public trackById(index: number, product: Product): number {
    return product.id;
  }
}
