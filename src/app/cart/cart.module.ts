import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToCartButtonComponent } from './components/add-to-cart-button/add-to-cart-button.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CartEntryComponent } from './components/cart-entry/cart-entry.component';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { CartListComponent } from './components/cart-list/cart-list.component';



@NgModule({
  declarations: [
    AddToCartButtonComponent,
    CartPageComponent,
    CartEntryComponent,
    CartListComponent
  ],
  exports: [
    AddToCartButtonComponent
  ],
  imports: [
    CommonModule,
    FaIconComponent
  ]
})
export class CartModule { }
