import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { switchMap, map, mergeMap } from 'rxjs/operators';

import {
  GetCourses,
  GetCoursesSuccess,
  ECoursesActions,
  ResetCourses
} from '../actions/courses.actions';
import { CoursesService } from '../../features/courses/services/courses.service';
import { ICourseForm } from 'src/app/features/courses/models/course-form.model';

@Injectable()
export class CoursesEffects {
  GetCourses$ = createEffect(() =>
    this.actions.pipe(
      ofType(ECoursesActions.GetCourses),
      switchMap(
        (payload: { start: number; count: number; textFragment: string }) =>
          this.coursesService
            .getList(payload.start, payload.count, payload.textFragment)
            .pipe(
              map((courses) => {
                return GetCoursesSuccess({ courses });
              })
            )
      )
    )
  );

  CreateCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(ECoursesActions.AddCourse),
      switchMap((payload: { item: ICourseForm }) =>
        this.coursesService.createCourse(payload.item).pipe(
          map(() => {
            const start = 0;
            const count = 3;
            const textFragment = '';

            return GetCourses({ start, count, textFragment });
          })
        )
      )
    )
  );

  DeleteCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(ECoursesActions.DeleteCourse),
      switchMap((payload: { id: number }) =>
        this.coursesService.removeItem(payload.id).pipe(
          mergeMap(() => {
            const actions = [];
            const start = 0;
            const count = 3;
            const textFragment = '';

            actions.push(ResetCourses());
            actions.push(GetCourses({ start, count, textFragment }));

            return actions;
          })
        )
      )
    )
  );

  constructor(
    private coursesService: CoursesService,
    private actions: Actions
  ) {}
}
