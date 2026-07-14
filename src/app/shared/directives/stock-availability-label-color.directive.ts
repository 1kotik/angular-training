import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[stockAvailabilityLabelColor]'
})
export class StockAvailabilityLabelColorDirective implements OnInit {
  @Input() public stockAvailabilityLabelColor: string = '';

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.el.nativeElement.style.color = this.stockAvailabilityLabelColor;
  }
}
