import {CanActivateFn, Router} from '@angular/router';
import {UserService} from "../../auth/services/user.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isLoggedIn) {
    return true;
  }

  router.navigate(['/auth']);
  return false;
};
