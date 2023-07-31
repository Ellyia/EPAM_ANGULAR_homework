import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IUserAuthState } from '../state/auth.state';

const selectAuth = (state: IAppState) => state.auth;

export const selectUserAuth = createSelector(
  selectAuth,
  (state: IUserAuthState) => state.auth
);
