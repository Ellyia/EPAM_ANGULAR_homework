import { Injectable } from '@angular/core';

import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../state/app.state';
import {
  LoginUser,
  LogoutUser,
  GetAuth,
  EAuthUserActions
} from '../actions/auth.actions';
import { AuthService } from 'src/app/core/services/auth.service';

export class AuthEffects {
  // getAuth$ = createEffect(
  //   () => {
  //     this._actions.pipe(
  //       ofType(EAuthUserActions.GetAuth)),
  //       switchMap(() => this._authService.isAuthenticated());
  //   },
  //   { dispatch: false }
  // );
  // constructor(
  //   private _authService: AuthService,
  //   private _actions: Actions,
  //   private store: Store
  // ) {}
}