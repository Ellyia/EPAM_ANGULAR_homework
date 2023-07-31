import { EAuthUserActions, AuthUserActions } from '../actions/auth.actions';

import { initialUserAuthState, IUserAuthState } from '../state/auth.state';

export const authUserReducer = (
  state = initialUserAuthState,
  action: AuthUserActions
): IUserAuthState => {
  switch (action.type) {
    case EAuthUserActions.LoginUser:
      return {
        ...state,
        auth: true,
        user: action.payload
      };
    case EAuthUserActions.LogoutUser:
      return {
        ...state,
        auth: false,
        user: {
          firstName: '',
          lastName: ''
        }
      };
    default:
      return state;
  }
};
