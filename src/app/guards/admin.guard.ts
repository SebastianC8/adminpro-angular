import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const role = userService.getRole;

  if (role === "ADMIN_ROLE") {
    return true;
  } else{
    router.navigateByUrl('/dashboard');
    return false;
  }

};
