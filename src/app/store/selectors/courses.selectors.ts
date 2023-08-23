import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ICourseState } from '../state/courses.state';

const selectCourses = (state: IAppState) => state.courses;

export const selectCoursesList = createSelector(
  selectCourses,
  (state: ICourseState) => state.courses
);

export const isCoursesToShow = createSelector(
  selectCourses,
  (state: ICourseState) => state.isCoursesToShow
);

export const searchStr = createSelector(
  selectCourses,
  (state: ICourseState) => state.searchStr
);

export const startToLoad = createSelector(
  selectCourses,
  (state: ICourseState) => state.startToLoad
);
