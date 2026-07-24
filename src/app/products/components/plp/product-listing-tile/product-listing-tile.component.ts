import {Component, inject, Input} from '@angular/core';
import {Product} from "../../../../shared/models/product.model";
import {ProductService} from "../../../services/product.service";
import {UserService} from "../../../../auth/services/user.service";

@Component({
  selector: 'product-listing-tile',
  templateUrl: './product-listing-tile.component.html',
  styleUrls: ['./product-listing-tile.component.scss', '../../../../shared/styles/buttons.scss']
})
export class ProductListingTileComponent {
  @Input() public product!: Product;
  private readonly productService: ProductService = inject(ProductService);
  public userService: UserService = inject(UserService);

  public delete(id: string): void {
    this.productService.deleteById(id);
  }
}
