import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ProductListingPageComponent
} from "./products/components/plp/product-listing-page/product-listing-page.component";

const routes: Routes = [
  {
    path: '',
    component: ProductListingPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
