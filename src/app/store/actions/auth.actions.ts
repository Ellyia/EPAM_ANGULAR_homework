import { createAction, props } from '@ngrx/store';
import { ILoginData } from 'src/app/core/models/login-data.model';

import { IUserName } from 'src/app/core/models/user-name.model';

export enum EAuthUserActions {
  GetAuth = '[Auth] Get Auth',
  LoginUser = '[Auth] Login User',
  LogoutUser = '[Auth] Logout User',
  GetLoginSuccess = '[Auth] Get Login Success'
}

export const GetAuth = createAction(EAuthUserActions.GetAuth);

export const LoginUser = createAction(
  EAuthUserActions.LoginUser,
  props<{ login: string; password: string }>()
);

export const GetLoginSuccess = createAction(
  EAuthUserActions.GetLoginSuccess,
  props<{ user: IUserName }>()
);

export const LogoutUser = createAction(EAuthUserActions.LogoutUser);
