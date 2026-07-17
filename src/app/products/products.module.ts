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
import { FilterSectionComponent } from './components/plp/filter-section/filter-section.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FilterBadgesListComponent } from './components/plp/filter-badges-list/filter-badges-list.component';
import { FilterBadgeComponent } from './components/plp/filter-badge/filter-badge.component';
import { FormatFilterValuePipe } from './pipes/format-filter-value.pipe';
import { EditPageComponent } from './components/edit-page/edit-page.component';


@NgModule({
  declarations: [
    ProductListingPageComponent,
    ProductListingTileComponent,
    SearchFilterPipe,
    ProductDetailsComponent,
    ProductReviewItemComponent,
    ProductReviewListComponent,
    ProductDetailsPageComponent,
    FilterSectionComponent,
    FilterBadgesListComponent,
    FilterBadgeComponent,
    FormatFilterValuePipe,
    EditPageComponent
  ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        SharedModule,
        FaIconComponent,
        CartModule,
        RouterLink,
        ReactiveFormsModule
    ]
})
export class ProductsModule { }
