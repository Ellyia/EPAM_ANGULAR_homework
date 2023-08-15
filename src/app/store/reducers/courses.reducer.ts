import { createReducer, on } from '@ngrx/store';
import {
  DeleteCourse,
  GetCourses,
  ResetCourses,
  EditCourse,
  AddCourse,
  GetCoursesSuccess,
  HideLoadMore,
  ShowLoadMore
} from '../actions/courses.actions';

import { initialCoursesState } from '../state/courses.state';

export const coursesReducer = createReducer(
  initialCoursesState,
  on(GetCourses, DeleteCourse, EditCourse, AddCourse, (state) => state),
  on(GetCoursesSuccess, (state, action) => ({
    ...state,
    courses: [...state.courses, ...action.courses]
  })),
  on(ResetCourses, (state) => ({ ...state, courses: [] })),
  on(HideLoadMore, (state) => ({ ...state, isCoursesToShow: false })),
  on(ShowLoadMore, (state) => ({ ...state, isCoursesToShow: true }))
);
