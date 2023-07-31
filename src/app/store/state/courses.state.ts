import { ICourse } from 'src/app/features/courses/models/course.model';

export interface ICourseState {
  courses: ICourse[];
}

export const initialCoursesState: ICourseState = {
  courses: []
};
