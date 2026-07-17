import {Component, inject, Input} from '@angular/core';
import {Product} from "../../../../shared/models/product.model";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'product-listing-tile',
  templateUrl: './product-listing-tile.component.html',
  styleUrls: ['./product-listing-tile.component.scss', '../../../../shared/styles/buttons.scss']
})
export class ProductListingTileComponent {
  @Input() public product!: Product;
  private readonly productService: ProductService = inject(ProductService);

  public delete(id: number): void {
    this.productService.deleteById(id);
  }
}
