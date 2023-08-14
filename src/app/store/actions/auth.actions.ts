import { createAction, props } from '@ngrx/store';
import { ILoginData } from 'src/app/core/models/login-data.model';

import { IUserName } from 'src/app/core/models/user-name.model';
import { IUser } from 'src/app/core/models/user.model';

export enum EAuthUserActions {
  SetToken = '[Auth] Set Token',
  RemoveToken = '[Auth] Remove Token',
  GetUser = '[Auth] Get user',
  SetUser = '[Auth] Set user',
  LoginUser = '[Auth] Login User',
  LoginError = '[Auth] Login Err',
  LogoutUser = '[Auth] Logout User'
}

export const SetToken = createAction(
  EAuthUserActions.SetToken,
  props<{ token: string }>()
);

export const GetUser = createAction(
  EAuthUserActions.GetUser,
  props<{ token: string }>()
);

export const RemoveToken = createAction(EAuthUserActions.RemoveToken);

export const SetUser = createAction(
  EAuthUserActions.SetUser,
  props<{ user: IUser }>()
);

export const LoginUser = createAction(
  EAuthUserActions.LoginUser,
  props<{ login: string; password: string }>()
);

export const LoginError = createAction(
  EAuthUserActions.LoginError,
  props<{ message: string }>()
);

export const LogoutUser = createAction(EAuthUserActions.LogoutUser);
