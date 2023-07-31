import { RouterReducerState } from '@ngrx/router-store';

import { IUserAuthState, initialUserAuthState } from './auth.state';
import { ICourseState, initialCoursesState } from './courses.state';

export interface IAppState {
  router?: RouterReducerState;
  auth: IUserAuthState;
  courses: ICourseState;
}

export const initialAppState = {
  auth: initialUserAuthState,
  courses: initialCoursesState
};

export function getInitState(): IAppState {
  return initialAppState;
}
