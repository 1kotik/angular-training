import {AfterViewInit, Directive, HostBinding, Input} from '@angular/core';
import {PRODUCT_AVAILABILITY} from "../constants/app.constants";

@Directive({
  selector: '[stockAvailability]'
})
export class StockAvailability implements AfterViewInit {
  @Input() public stockAvailability = 0;
  @HostBinding('style.color') public color?: string;
  @HostBinding('textContent') public text?: string;

  ngAfterViewInit() {
    const productAvailability = this.computeProductAvailability(this.stockAvailability);
    this.color = productAvailability.labelColor;
    this.text = productAvailability.text;
  }

  public computeProductAvailability(stock: number) {
    if (stock > 9) {
      return PRODUCT_AVAILABILITY.IN_STOCK;
    }
    if (stock > 0) {
      return PRODUCT_AVAILABILITY.ALMOST_SOLD_OUT;
    }
    return PRODUCT_AVAILABILITY.OUT_OF_STOCK;
  }
}
