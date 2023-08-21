import { createAction, props } from '@ngrx/store';
import { ICourseForm } from 'src/app/features/courses/models/course-form.model';
import { ICourse } from 'src/app/features/courses/models/course.model';

export enum ECoursesActions {
  CoursesInit = '[Courses] Courses Init',
  GetCoursesSuccess = '[Courses] Get Courses Success',
  ResetCourses = '[Courses] Reset Courses',
  DeleteCourse = '[Courses] Delete Course',
  EditCourse = '[Courses] Edit Course',
  AddCourse = '[Courses] Add Course',
  GetCourse = '[Courses] Get Course',
  DeleteCourseSuccess = '[Courses] Edit Course Success',
  EditCourseSuccess = '[Courses] Delete Course Success',
  AddCourseSuccess = '[Courses] Add Course Success'
}

export const CoursesInit = createAction(
  ECoursesActions.CoursesInit,
  props<{ start: number; count: number; textFragment: string }>()
);

export const GetCoursesSuccess = createAction(
  ECoursesActions.GetCoursesSuccess,
  props<{ courses: ICourse[] }>()
);

export const ResetCourses = createAction(ECoursesActions.ResetCourses);

export const DeleteCourse = createAction(
  ECoursesActions.DeleteCourse,
  props<{ id: number }>()
);

export const DeleteCourseSuccess = createAction(
  ECoursesActions.DeleteCourseSuccess
);

export const EditCourse = createAction(
  ECoursesActions.EditCourse,
  props<{ course: ICourseForm }>()
);

export const EditCourseSuccess = createAction(
  ECoursesActions.EditCourseSuccess
);

export const AddCourse = createAction(
  ECoursesActions.AddCourse,
  props<{ course: ICourseForm }>()
);

export const AddCourseSuccess = createAction(ECoursesActions.AddCourseSuccess);
