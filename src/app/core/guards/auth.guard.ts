import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // return authService.isAuthenticated().pipe(
  //   map(isAuthenticated => {
  //       if (isAuthenticated) {
  //         return true;
  //       } else {
  //         router.navigate(['/login']);
  //         return false;
  //       }
  //     }
  // )

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
