import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import {CurrencyFormatPipe} from './pipes/currency-format.pipe';
import {StockAvailabilityComponent} from './components/stock-availability/stock-availability.component';
import {RatingComponent} from './components/rating/rating.component';
import { StockAvailabilityLabelColorDirective } from './directives/stock-availability-label-color.directive';


@NgModule({
  declarations: [

    CurrencyFormatPipe,
      StockAvailabilityComponent,
      RatingComponent,
      StockAvailabilityLabelColorDirective
  ],
  exports: [
    CurrencyFormatPipe,
    StockAvailabilityComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    FaIconComponent,
  ]
})
export class SharedModule {
}
