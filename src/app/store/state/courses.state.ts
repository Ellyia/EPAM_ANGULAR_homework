import { ICourse } from 'src/app/features/courses/models/course.model';

export interface ICourseState {
  courses: ICourse[];
  isCoursesToShow: boolean;
}

export const initialCoursesState: ICourseState = {
  courses: [],
  isCoursesToShow: false
};
