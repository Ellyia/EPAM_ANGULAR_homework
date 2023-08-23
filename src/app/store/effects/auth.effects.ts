import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { IToken } from 'src/app/core/models/token.model';
import { IUser } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

import {
  EAuthUserActions,
  LoginError,
  SetUser,
  GetUserInit,
  LoginSuccess
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  private lsPropToken = 'token';

  GetUserInit$ = createEffect(() =>
    this.actions.pipe(
      ofType(EAuthUserActions.TokenExists),
      map(() => {
        return GetUserInit();
      }),
      catchError(() => of(LoginError({ message: 'Login failed' })))
    )
  );

  Login$ = createEffect(() =>
    this.actions.pipe(
      ofType(EAuthUserActions.LoginUser),
      switchMap((payload: { login: string; password: string }) =>
        this.authService.login(payload).pipe(
          tap((data: IToken) => {
            localStorage.setItem(this.lsPropToken, data.token);
            this.router.navigate(['/courses']);
          }),
          map((data: IToken) => {
            return LoginSuccess({ token: data.token });
          }),
          catchError(() => of(LoginError({ message: 'Login failed' })))
        )
      )
    )
  );

  LoginSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(EAuthUserActions.LoginSuccess),
      map(() => {
        return GetUserInit();
      }),
      catchError(() => of(LoginError({ message: 'Login failed' })))
    )
  );

  Logout$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(EAuthUserActions.LogoutUser),
        tap(() => {
          localStorage.removeItem(this.lsPropToken);
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  GetUser$ = createEffect(() => {
    return this.actions.pipe(
      ofType(EAuthUserActions.GetUserInit),
      mergeMap(() => {
        return this.authService.getUserInfo().pipe(
          map((user: IUser) => SetUser({ user })),
          catchError(() => of(LoginError({ message: 'No user' })))
        );
      })
    );
  });

  constructor(
    private authService: AuthService,
    private actions: Actions,
    private router: Router
  ) {}
}
