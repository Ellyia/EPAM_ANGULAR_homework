import { createReducer, on } from '@ngrx/store';
import {
  LoginUser,
  LogoutUser,
  SetToken,
  RemoveToken,
  SetUser
} from '../actions/auth.actions';

import { initialUserAuthState } from '../state/auth.state';

export const authUserReducer = createReducer(
  initialUserAuthState,
  on(SetToken, (state, { token }) => ({
    ...state,
    token
  })),
  on(RemoveToken, (state) => ({
    ...state,
    token: ''
  })),
  on(SetUser, (state, { user }) => ({
    ...state,
    user: {
      firstName: user.name.first,
      lastName: user.name.last
    }
  })),
  on(LoginUser, (state) => state),
  on(LogoutUser, (state) => ({
    ...state,
    ...initialUserAuthState
  }))
);
