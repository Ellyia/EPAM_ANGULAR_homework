import { ECoursesActions, CoursesActions } from '../actions/courses.actions';

import { ICourseState, initialCoursesState } from '../state/courses.state';

export const coursesReducer = (
  state = initialCoursesState,
  action: CoursesActions
): ICourseState => {
  switch (action.type) {
    case ECoursesActions.GetCourses:
      return {
        ...state,
        courses: [...action.payload]
      };
    default:
      return state;
  }
};
