import { createReducer, on } from '@ngrx/store';
import {
  EAuthUserActions,
  LoginUser,
  LogoutUser,
  GetLoginSuccess
} from '../actions/auth.actions';

import { initialUserAuthState, IUserAuthState } from '../state/auth.state';

export const authUserReducer = createReducer(
  initialUserAuthState,
  on(LoginUser, (state) => ({ ...state })),
  on(GetLoginSuccess, (state, action) => ({
    ...state,
    auth: true,
    user: {
      firstName: action.user.firstName,
      lastName: action.user.lastName
    }
  })),
  on(LogoutUser, (state) => ({
    ...state,
    auth: false,
    user: {
      firstName: '',
      lastName: ''
    }
  }))
);
