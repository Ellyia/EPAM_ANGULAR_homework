import { createAction, props } from '@ngrx/store';

import { IUser } from 'src/app/core/models/user.model';

export enum EAuthUserActions {
  TokenExists = '[Auth] Token Exists',
  GetUserInit = '[Auth] Get user',
  SetUser = '[Auth] Set user',
  LoginUser = '[Auth] Login User',
  LoginSuccess = '[Auth] Login Success',
  LoginError = '[Auth] Login Err',
  LogoutUser = '[Auth] Logout User'
}

export const TokenExists = createAction(
  EAuthUserActions.TokenExists,
  props<{ token: string }>()
);

export const GetUserInit = createAction(EAuthUserActions.GetUserInit);

export const SetUser = createAction(
  EAuthUserActions.SetUser,
  props<{ user: IUser }>()
);

export const LoginUser = createAction(
  EAuthUserActions.LoginUser,
  props<{ login: string; password: string }>()
);

export const LoginSuccess = createAction(
  EAuthUserActions.LoginSuccess,
  props<{ token: string }>()
);

export const LoginError = createAction(
  EAuthUserActions.LoginError,
  props<{ message: string }>()
);

export const LogoutUser = createAction(EAuthUserActions.LogoutUser);
