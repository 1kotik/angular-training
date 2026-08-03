import {Component, inject} from '@angular/core';
import {faChild, faShoppingCart, faSignOut} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../../../auth/services/user.service";

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {
  protected readonly faChild = faChild;
  protected readonly faShoppingCart = faShoppingCart;
  protected readonly faSignOut = faSignOut;
  public userService: UserService = inject(UserService);

  public logout(): void {
    this.userService.logout();
  }
}
