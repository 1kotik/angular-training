import {Component, inject, Input} from '@angular/core';
import {Product} from "../../../../shared/models/product.model";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-product-listing-tile',
  templateUrl: './product-listing-tile.component.html',
  styleUrl: './product-listing-tile.component.scss'
})
export class ProductListingTileComponent {
  @Input() public product!: Product;

  public cartButtonPressed: boolean = false;
  public addToCartCount: number = 1;
  protected readonly faStar = faStar;

  private readonly productService: ProductService = inject(ProductService);

  public delete(id: number): void {
    this.productService.deleteById(id);
  }
}
