import { createReducer, on } from '@ngrx/store';
import {
  EAuthUserActions,
  LoginUser,
  LogoutUser
} from '../actions/auth.actions';

import { initialUserAuthState, IUserAuthState } from '../state/auth.state';

export const authUserReducer = createReducer(
  initialUserAuthState,
  on(LoginUser, (state, action) => ({
    ...state,
    auth: true,
    user: {
      firstName: action.user.firstName,
      lastName: action.user.lastName
    }
  })), // action.login, action.password
  on(LogoutUser, (state) => ({
    ...state,
    auth: false,
    user: {
      firstName: '',
      lastName: ''
    }
  }))
);

// export const authUserReducer = (
//   state = initialUserAuthState,
//   action: AuthUserActions
// ): IUserAuthState => {
//   switch (action.type) {
//     case EAuthUserActions.LoginUser:
//       return {
//         ...state,
//         auth: true,
//         user: action.payload
//       };
//     case EAuthUserActions.LogoutUser:
//       return {
//         ...state,
//         auth: false,
//         user: {
//           firstName: '',
//           lastName: ''
//         }
//       };
//     default:
//       return state;
//   }
// };
