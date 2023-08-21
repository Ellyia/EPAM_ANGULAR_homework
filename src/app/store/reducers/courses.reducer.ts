import { createReducer, on } from '@ngrx/store';
import {
  DeleteCourse,
  CoursesInit,
  ResetCourses,
  EditCourse,
  AddCourse,
  GetCoursesSuccess,
  AddCourseSuccess,
  EditCourseSuccess,
  DeleteCourseSuccess
} from '../actions/courses.actions';

import { initialCoursesState } from '../state/courses.state';

const count = 3;

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CoursesInit, DeleteCourse, EditCourse, AddCourse, (state) => state),
  on(GetCoursesSuccess, (state, action) => ({
    ...state,
    courses: [...state.courses, ...action.courses],
    isCoursesToShow: action.courses.length >= count
  })),
  on(
    ResetCourses,
    AddCourseSuccess,
    EditCourseSuccess,
    DeleteCourseSuccess,
    (state) => ({
      ...state,
      courses: []
    })
  )
);
