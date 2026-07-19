import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ProductListingPageComponent
} from "./products/components/plp/product-listing-page/product-listing-page.component";
import {
  ProductDetailsPageComponent
} from "./products/components/pdp/product-details-page/product-details-page.component";
import {ProductEditPageComponent} from "./products/components/edit-page/product-edit-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductListingPageComponent,
  },
  {
    path: 'products/edit/:id',
    component: ProductEditPageComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
