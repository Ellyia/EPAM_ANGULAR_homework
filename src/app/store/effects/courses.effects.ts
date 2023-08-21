import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { switchMap, map, mergeMap, tap } from 'rxjs/operators';

import {
  CoursesInit,
  EditCourse,
  GetCoursesSuccess,
  ECoursesActions,
  ResetCourses,
  AddCourseSuccess,
  DeleteCourseSuccess,
  EditCourseSuccess
} from '../actions/courses.actions';
import { CoursesService } from '../../features/courses/services/courses.service';
import { ICourseForm } from 'src/app/features/courses/models/course-form.model';
import { Router } from '@angular/router';

@Injectable()
export class CoursesEffects {
  GetCourses$ = createEffect(() =>
    this.actions.pipe(
      ofType(ECoursesActions.CoursesInit),
      switchMap(
        (payload: { start: number; count: number; textFragment: string }) =>
          this.getCourses(payload.start, payload.count, payload.textFragment)
      )
    )
  );

  AddCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(ECoursesActions.AddCourse),
      switchMap((payload: { course: ICourseForm }) =>
        this.coursesService.createCourse(payload.course).pipe(
          map(() => {
            return AddCourseSuccess();
          })
        )
      )
    )
  );

  EditCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(ECoursesActions.EditCourse),
      switchMap((payload: { course: ICourseForm }) =>
        this.coursesService.updateItem(payload.course).pipe(
          map(() => {
            return EditCourseSuccess();
          })
        )
      )
    )
  );

  DeleteCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(ECoursesActions.DeleteCourse),
      switchMap((payload: { id: number }) =>
        this.coursesService
          .removeItem(payload.id)
          .pipe(map(() => DeleteCourseSuccess()))
      )
    )
  );

  ResetCourses$ = createEffect(() =>
    this.actions.pipe(
      ofType(ECoursesActions.DeleteCourseSuccess),
      switchMap(() => {
        return this.getCourses();
      })
    )
  );

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private actions: Actions
  ) {}

  getCourses(start = 0, count = 3, textFragment = '') {
    return this.coursesService.getList(start, count, textFragment).pipe(
      map((courses) => {
        return GetCoursesSuccess({ courses });
      })
    );
  }
}
