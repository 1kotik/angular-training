import { Component } from '@angular/core';
import {faChild, faShoppingCart, faSignOut} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {
  protected readonly faChild = faChild;
  protected readonly faShoppingCart = faShoppingCart;
  protected readonly faSignOut = faSignOut;
}
