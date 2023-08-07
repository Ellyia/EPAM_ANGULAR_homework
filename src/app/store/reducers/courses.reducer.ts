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

import { ICourseState, initialCoursesState } from '../state/courses.state';

export const coursesReducer = createReducer(
  initialCoursesState,
  on(GetCourses, (state) => ({ ...state })),
  on(GetCoursesSuccess, (state, action) => ({
    ...state,
    courses: [...state.courses, ...action.courses]
  })),
  on(ResetCourses, (state) => ({ ...state, courses: [] })),
  on(DeleteCourse, (state) => ({ ...state })),
  on(EditCourse, (state) => ({ ...state })),
  on(AddCourse, (state) => ({ ...state })),
  on(HideLoadMore, (state) => ({ ...state, isCoursesToShow: false })),
  on(ShowLoadMore, (state) => ({ ...state, isCoursesToShow: true }))
);
