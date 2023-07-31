import { Injectable } from '@angular/core';

import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../state/app.state';
import { LoginUser, LogoutUser, GetAuth } from '../actions/auth.actions';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class AuthEffects {
  @Effect()
  getAuth$ = this._actions.pipe(ofType<>());

  constructor(private _authService: AuthService, private _actions: Actions) {}
}
