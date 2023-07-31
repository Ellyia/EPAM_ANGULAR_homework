import { Action } from '@ngrx/store';

import { IUserName } from 'src/app/core/models/user-name.model';

export enum EAuthUserActions {
  // GetUser = '[User] Get User',
  GetAuth = '[Auth] Get Auth',
  LoginUser = '[Auth] Login User',
  LogoutUser = '[Auth] Logout User'
}

// export class GetUser implements Action {
//   public readonly type = EAuthUserActions.GetUser;
// }

export class GetAuth implements Action {
  public readonly type = EAuthUserActions.GetAuth;
}

export class LoginUser implements Action {
  public readonly type = EAuthUserActions.LoginUser;
  constructor(public payload: IUserName) {}
}

export class LogoutUser implements Action {
  public readonly type = EAuthUserActions.LogoutUser;
}

export type AuthUserActions =
  // GetUser
  GetAuth | LoginUser | LogoutUser;
