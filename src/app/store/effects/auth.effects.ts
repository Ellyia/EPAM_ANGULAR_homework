import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { IToken } from 'src/app/core/models/token.model';
import { IUser } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

import {
  EAuthUserActions,
  SetToken,
  LoginError,
  SetUser,
  GetUser
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  private lsPropToken = 'token';

  Login$ = createEffect(() =>
    this._actions.pipe(
      ofType(EAuthUserActions.LoginUser),
      switchMap((payload: { login: string; password: string }) =>
        this._authService.login(payload).pipe(
          tap((data: IToken) => {
            localStorage.setItem(this.lsPropToken, data.token);
            this._router.navigate(['/courses']);
          }),
          mergeMap((data: IToken) => {
            const actions = [];
            actions.push(SetToken({ token: data.token })),
              actions.push(GetUser(data));

            return actions;
          }),
          catchError(() => of(LoginError({ message: 'Login failed' })))
        )
      )
    )
  );

  Logout$ = createEffect(
    () =>
      this._actions.pipe(
        ofType(EAuthUserActions.LogoutUser),
        tap(() => {
          localStorage.removeItem(this.lsPropToken);
          this._router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  GetUser$ = createEffect(() => {
    return this._actions.pipe(
      ofType(EAuthUserActions.GetUser),
      mergeMap(() => {
        return this._authService.getUserInfo().pipe(
          map((user: IUser) => SetUser({ user })),
          catchError(() => of(LoginError({ message: 'No user' })))
        );
      })
    );
  });

  constructor(
    private _authService: AuthService,
    private _actions: Actions,
    private _router: Router
  ) {}
}
