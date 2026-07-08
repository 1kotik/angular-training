import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ProductListingPageComponent } from './components/plp/product-listing-page/product-listing-page.component';
import { ProductListingTileComponent } from './components/plp/product-listing-tile/product-listing-tile.component';
import {SharedModule} from "../shared/shared.module";
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    ProductListingPageComponent,
    ProductListingTileComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    SharedModule,
    FaIconComponent
  ]
})
export class ProductsModule { }
