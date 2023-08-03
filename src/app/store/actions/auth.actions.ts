import { createAction, props } from '@ngrx/store';
import { ILoginData } from 'src/app/core/models/login-data.model';

import { IUserName } from 'src/app/core/models/user-name.model';

export enum EAuthUserActions {
  GetAuth = '[Auth] Get Auth',
  LoginUser = '[Auth] Login User',
  LogoutUser = '[Auth] Logout User'
}

// export class GetUser implements Action {
//   public readonly type = EAuthUserActions.GetUser;
// }

export const GetAuth = createAction(EAuthUserActions.GetAuth);

export const LoginUser = createAction(
  EAuthUserActions.LoginUser,
  props<{ user: IUserName }>()
  // props<{login: string, password: string}>()
);
// constructor(public payload: IUserName) {}
// constructor(public payload: ILoginData) {}
// login: string;
// password: string;

export const LogoutUser = createAction(EAuthUserActions.LogoutUser);

// export type AuthUserActions = GetAuth | LoginUser | LogoutUser;
