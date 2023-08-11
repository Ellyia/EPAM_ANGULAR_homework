import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  createEffect,
  Actions,
  ofType,
  ROOT_EFFECTS_INIT
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { IToken } from 'src/app/core/models/token.model';
import { IUser } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

import {
  EAuthUserActions,
  SetToken,
  LoginError,
  LoginUser,
  LogoutUser,
  SetUser
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  Login$ = createEffect(() =>
    this._actions.pipe(
      ofType(EAuthUserActions.LoginUser),
      mergeMap((payload: { login: string; password: string }) =>
        this._authService.login(payload).pipe(
          tap((data: IToken) => {
            localStorage.setItem('token', data.token);
          }),
          map((data: IToken) => SetToken(data)),
          catchError(() => of(LoginError({ message: 'Login failed' })))
        )
      )
    )
  );

  // Login$ = createEffect(() =>
  //   this._actions.pipe(
  //     ofType(EAuthUserActions.LoginUser),
  //     switchMap((payload: { login: string; password: string }) =>
  //       this._authService.login(payload).pipe(
  //         tap((data: IToken) => {
  //           localStorage.setItem('token', data.token);
  //         }),
  //         mergeMap((data: IToken) => {
  //           const actions = [];
  //           actions.push(SetToken(data));
  //           actions.push(
  //         }),
  //         catchError(() => of(LoginError({ message: 'Login failed' })))
  //       )
  //     )
  //   )
  // );

  Logout$ = createEffect(
    () =>
      this._actions.pipe(
        ofType(EAuthUserActions.LogoutUser),
        // mergeMap(() => {
        //   return of(this._authService.logout()).pipe(map(() => LogoutUser()));
        // }),
        tap(() => {
          localStorage.removeItem('token');
          this._router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  // init$ = createEffect(() => {
  //   return this._actions.pipe(
  //     ofType(ROOT_EFFECTS_INIT),
  //     mergeMap(({ email, password }) => {
  //       return this._authService.getUserInfo().pipe(
  //         map((user: IUser) => SetUser({ user })),
  //         tap((user) => {
  //           // localStorage.setItem('user', JSON.stringify(user));
  //           this._router.navigate(['/courses']);
  //         }),
  //         catchError(() => of(LoginError({ message: 'Login failed' })))
  //       );
  //     })
  //   );
  // });

  constructor(
    private _authService: AuthService,
    private _actions: Actions,
    private _store: Store,
    private _router: Router
  ) {}
}
