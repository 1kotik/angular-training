import { Pipe, PipeTransform } from '@angular/core';
import {APP_CONSTANTS} from "../constants/app.constants";

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number): string {
    if(!value) {
      return '';
    }
    return `${APP_CONSTANTS.CURRENCY} ${value}`;
  }

}
