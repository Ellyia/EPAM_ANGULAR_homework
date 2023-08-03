import { createReducer, on } from '@ngrx/store';
import {
  DeleteCourse,
  GetCourses,
  EditCourse,
  AddCourse,
  GetCoursesSuccess
} from '../actions/courses.actions';

import { ICourseState, initialCoursesState } from '../state/courses.state';

export const coursesReducer = createReducer(
  initialCoursesState,
  on(GetCourses, (state) => ({ ...state })),
  on(GetCoursesSuccess, (state, action) => ({
    ...state,
    courses: action.courses
  })),
  on(DeleteCourse, (state) => ({ ...state })),
  on(EditCourse, (state) => ({ ...state })),
  on(AddCourse, (state) => ({ ...state }))
);
