import { createReducer, on } from '@ngrx/store';
import {
  LoginUser,
  LogoutUser,
  TokenExists,
  SetUser,
  GetUserInit,
  LoginSuccess
} from '../actions/auth.actions';

import { initialUserAuthState } from '../state/auth.state';

export const authUserReducer = createReducer(
  initialUserAuthState,
  on(TokenExists, LoginSuccess, (state, { token }) => ({
    ...state,
    token
  })),
  on(SetUser, (state, { user }) => ({
    ...state,
    user: {
      firstName: user.name.first,
      lastName: user.name.last
    }
  })),
  on(LoginUser, GetUserInit, (state) => state),
  on(LogoutUser, (state) => ({
    ...state,
    ...initialUserAuthState
  }))
);
