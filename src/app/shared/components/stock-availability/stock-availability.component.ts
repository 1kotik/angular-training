import {Component, Input} from '@angular/core';

@Component({
  selector: 'stock-availability',
  templateUrl: './stock-availability.component.html',
  styleUrl: './stock-availability.component.scss'
})
export class StockAvailabilityComponent {
  @Input() public stock = 0;
}
