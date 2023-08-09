import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IUserAuthState } from '../state/auth.state';

const selectAuth = (state: IAppState) => state.auth;

export const selectToken = createSelector(
  selectAuth,
  (state: IUserAuthState) => state.token
);

export const selectIsAuth = createSelector(
  selectAuth,
  (state: IUserAuthState) => !!state.token
);

export const selectUser = createSelector(
  selectAuth,
  (state: IUserAuthState) => state.user
);
