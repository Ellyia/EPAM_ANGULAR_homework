import { Action } from '@ngrx/store';
import { ICourseForm } from 'src/app/features/courses/models/course-form.model';
import { ICourse } from 'src/app/features/courses/models/course.model';

export enum ECoursesActions {
  GetCourses = '[Courses] Get Courses',
  DeleteCourse = '[Courses] Delete Course',
  EditCourse = '[Courses] Edit Course',
  AddCourse = '[Courses] Add Course',
  GetCourse = '[Courses] Get Course'
}

export class GetCourses implements Action {
  public readonly type = ECoursesActions.GetCourses;
  constructor(public payload: ICourse[]) {}
}

export class DeleteCourse implements Action {
  public readonly type = ECoursesActions.DeleteCourse;
  constructor(public payload: ICourse[]) {}
}

export class EditCourse implements Action {
  public readonly type = ECoursesActions.EditCourse;
  constructor(public payload: ICourseForm) {}
}

export class AddCourse implements Action {
  public readonly type = ECoursesActions.AddCourse;
  constructor(public payload: ICourseForm) {}
}

export class GetCourse implements Action {
  public readonly type = ECoursesActions.GetCourse;
  constructor(public payload: number) {}
}

export type CoursesActions =
  | GetCourses
  | DeleteCourse
  | EditCourse
  | AddCourse
  | GetCourse;
