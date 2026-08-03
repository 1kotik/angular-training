import {AfterViewInit, Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[stockAvailabilityLabelColor]'
})
export class StockAvailabilityLabelColorDirective implements AfterViewInit {
  @Input() public stockAvailabilityLabelColor = '';
  @HostBinding('style.color') public color?: string;

  ngAfterViewInit() {
    this.color = this.stockAvailabilityLabelColor;
  }
}
