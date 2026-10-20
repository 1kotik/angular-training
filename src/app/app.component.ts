import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "./auth/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private userService: UserService = inject(UserService);

  ngOnInit() {
    this.userService.loadUserFromStorage();
  }
}
