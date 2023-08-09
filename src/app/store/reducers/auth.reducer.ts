import { createReducer, on } from '@ngrx/store';
import {
  EAuthUserActions,
  LoginUser,
  LogoutUser,
  SetToken,
  RemoveToken,
  SetUser
  // GetLoginSuccess,
  // GetAuthSuccess
} from '../actions/auth.actions';

import { initialUserAuthState, IUserAuthState } from '../state/auth.state';

export const authUserReducer = createReducer(
  initialUserAuthState,
  on(SetToken, (state, { token }) => ({ ...state, token })),
  on(RemoveToken, (state) => ({ ...state, token: '' })),
  on(SetUser, (state, { user }) => ({
    ...state,
    user: {
      firstName: user.name.first,
      lastName: user.name.last
    }
  })),
  on(LoginUser, (state) => ({ ...state })),
  on(LogoutUser, (state) => ({
    ...state,
    ...initialUserAuthState
    // auth: false,
    // user: {
    //   firstName: '',
    //   lastName: ''
    // }
  }))
  // on(GetLoginSuccess, (state, action) => ({
  //   ...state,
  //   auth: true,
  //   user: {
  //     firstName: action.user.firstName,
  //     lastName: action.user.lastName
  //   }
  // })),
);
