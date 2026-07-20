import {Component, inject, Input} from '@angular/core';
import {CartEntry} from "../../../shared/models/cart-entry.model";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'cart-entry',
  templateUrl: './cart-entry.component.html',
  styleUrl: './cart-entry.component.scss'
})
export class CartEntryComponent {
  @Input() public entry!: CartEntry;
  private cartService: CartService = inject(CartService);
  protected readonly faTimes = faTimes;

  public removeEntry(): void {
    this.cartService.removeEntry(this.entry.id);
  }
}
