import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  return userService.checkToken().pipe(
    tap((isLogged: any) => {
      if (!isLogged) {
        router.navigateByUrl('/login')
      }
    })
  );
};

export const canMatch: CanMatchFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);
  return userService.checkToken().pipe(
    tap((isLogged: any) => {
      if (!isLogged) {
        router.navigateByUrl('/login')
      }
    })
  )
}
