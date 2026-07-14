import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ProductListingPageComponent} from './components/plp/product-listing-page/product-listing-page.component';
import {ProductListingTileComponent} from './components/plp/product-listing-tile/product-listing-tile.component';
import {SharedModule} from "../shared/shared.module";
import {SearchFilterPipe} from './pipes/search-filter.pipe';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CartModule} from "../cart/cart.module";
import {ProductDetailsComponent} from './components/pdp/product-details/product-details.component';
import {RouterLink} from "@angular/router";
import { ProductReviewItemComponent } from './components/pdp/product-reviews/product-review-item/product-review-item.component';
import { ProductReviewListComponent } from './components/pdp/product-reviews/product-review-list/product-review-list.component';
import { ProductDetailsPageComponent } from './components/pdp/product-details-page/product-details-page.component';


@NgModule({
  declarations: [
    ProductListingPageComponent,
    ProductListingTileComponent,
    SearchFilterPipe,
    ProductDetailsComponent,
    ProductReviewItemComponent,
    ProductReviewListComponent,
    ProductDetailsPageComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    SharedModule,
    FaIconComponent,
    CartModule,
    RouterLink
  ]
})
export class ProductsModule { }
