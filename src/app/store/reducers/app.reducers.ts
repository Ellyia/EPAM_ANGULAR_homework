import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { IAppState } from '../state/app.state';
import { authUserReducer } from './auth.reducer';
import { coursesReducer } from './courses.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  auth: authUserReducer,
  courses: coursesReducer
};
