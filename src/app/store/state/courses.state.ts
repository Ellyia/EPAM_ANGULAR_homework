import { ICourse } from 'src/app/features/courses/models/course.model';

export interface ICourseState {
  courses: ICourse[];
  isCoursesToShow: boolean;
  searchStr: string;
  startToLoad: number;
}

export const initialCoursesState: ICourseState = {
  courses: [],
  isCoursesToShow: false,
  searchStr: '',
  startToLoad: 0
};
