import { createAction, props } from '@ngrx/store';
import { ICourseForm } from 'src/app/features/courses/models/course-form.model';
import { ICourse } from 'src/app/features/courses/models/course.model';

export enum ECoursesActions {
  GetCourses = '[Courses] Get Courses',
  GetCoursesSuccess = '[Courses] Get Courses Success',
  ResetCourses = '[Courses] Reset Courses',
  DeleteCourse = '[Courses] Delete Course',
  EditCourse = '[Courses] Edit Course',
  AddCourse = '[Courses] Add Course',
  GetCourse = '[Courses] Get Course',
  ShowLoadMore = '[Courses] Show Load More',
  HideLoadMore = '[Courses] Hide Load More'
}

export const GetCourses = createAction(
  ECoursesActions.GetCourses,
  props<{ start: number; count: number; textFragment: string }>()
);

export const GetCoursesSuccess = createAction(
  ECoursesActions.GetCoursesSuccess,
  props<{ courses: ICourse[] }>()
);

export const ResetCourses = createAction(ECoursesActions.ResetCourses);

export const ShowLoadMore = createAction(ECoursesActions.ShowLoadMore);

export const HideLoadMore = createAction(ECoursesActions.HideLoadMore);

export const DeleteCourse = createAction(
  ECoursesActions.DeleteCourse,
  props<{ id: number }>()
);

export const EditCourse = createAction(
  ECoursesActions.EditCourse,
  props<{ course: ICourseForm }>()
);

export const AddCourse = createAction(
  ECoursesActions.AddCourse,
  props<{ course: ICourseForm }>()
);

// export type CoursesActions =
//   | GetCourses
//   | DeleteCourse
//   | EditCourse
//   | AddCourse;
