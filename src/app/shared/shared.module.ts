import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import {CurrencyFormatPipe} from './pipes/currency-format.pipe';
import {StockAvailabilityComponent} from './components/stock-availability/stock-availability.component';
import {RatingComponent} from './components/rating/rating.component';
import {StockAvailabilityLabelColorDirective} from './directives/stock-availability-label-color.directive';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RangeFilterComponent} from "./components/range-filter/range-filter.component";
import { MapToArrayPipe } from './pipes/map-to-array.pipe';
import { SimpleInputComponent } from './components/simple-input/simple-input.component';
import { DefaultImageDirective } from './directives/default-image.directive';


@NgModule({
  declarations: [

    CurrencyFormatPipe,
      StockAvailabilityComponent,
      RatingComponent,
      StockAvailabilityLabelColorDirective,
      RangeFilterComponent,
      MapToArrayPipe,
      SimpleInputComponent,
      DefaultImageDirective
  ],
  exports: [
    CurrencyFormatPipe,
    StockAvailabilityComponent,
    RatingComponent,
    RangeFilterComponent,
    MapToArrayPipe,
    SimpleInputComponent,
    DefaultImageDirective
  ],
  imports: [
    CommonModule,
    RouterLink,
    FaIconComponent,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule {
}
