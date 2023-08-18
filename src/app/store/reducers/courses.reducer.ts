import { createReducer, on } from '@ngrx/store';
import {
  DeleteCourse,
  GetCourses,
  ResetCourses,
  EditCourse,
  AddCourse,
  GetCoursesSuccess
} from '../actions/courses.actions';

import { initialCoursesState } from '../state/courses.state';

const count = 3;

export const coursesReducer = createReducer(
  initialCoursesState,
  on(GetCourses, DeleteCourse, EditCourse, AddCourse, (state) => state),
  on(GetCoursesSuccess, (state, action) => ({
    ...state,
    courses: [...state.courses, ...action.courses],
    isCoursesToShow: action.courses.length >= count
  })),
  on(ResetCourses, (state) => ({ ...state, courses: [] }))
);
