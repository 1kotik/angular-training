import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationButtonComponent } from '../core/components/navigation/navigation-button/navigation-button.component';
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';



@NgModule({
  declarations: [

    CurrencyFormatPipe
  ],
  exports: [
    CurrencyFormatPipe
  ],
  imports: [
    CommonModule,
    RouterLink,
    FaIconComponent,
  ]
})
export class SharedModule { }
