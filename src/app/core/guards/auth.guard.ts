import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { map, Observable, of } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return of(authService.isAuthenticated()).pipe(
    map((v) => {
      if (v) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
