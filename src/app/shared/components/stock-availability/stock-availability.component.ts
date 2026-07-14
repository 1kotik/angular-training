import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stock-availability',
  templateUrl: './stock-availability.component.html',
  styleUrl: './stock-availability.component.scss'
})
export class StockAvailabilityComponent implements OnInit {
  @Input() public stock: number = 0;

  public productAvailability = PRODUCT_AVAILABILITY.OUT_OF_STOCK;

  ngOnInit(): void {
    this.productAvailability = this.computeProductAvailability(this.stock);
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

export const PRODUCT_AVAILABILITY = {
  IN_STOCK: {
    text: 'In stock',
    labelColor: 'green'
  },
  ALMOST_SOLD_OUT: {
    text: 'Almost sold out',
    labelColor: 'orange'
  },
  OUT_OF_STOCK: {
    text: 'Out of stock',
    labelColor: 'red'
  }
}
