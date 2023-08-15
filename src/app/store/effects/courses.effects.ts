import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { switchMap, map, mergeMap } from 'rxjs/operators';

import {
  GetCourses,
  GetCoursesSuccess,
  ECoursesActions,
  HideLoadMore,
  ShowLoadMore,
  ResetCourses
} from '../actions/courses.actions';
import { CoursesService } from '../../features/courses/services/courses.service';
import { ICourseForm } from 'src/app/features/courses/models/course-form.model';

@Injectable()
export class CoursesEffects {
  GetCourses$ = createEffect(() =>
    this._actions.pipe(
      ofType(ECoursesActions.GetCourses),
      switchMap(
        (payload: { start: number; count: number; textFragment: string }) =>
          this._coursesService
            .getList(payload.start, payload.count, payload.textFragment)
            .pipe(
              mergeMap((courses) => {
                const actions = [];
                if (courses.length < 3) {
                  actions.push(HideLoadMore());
                } else {
                  actions.push(ShowLoadMore());
                }
                actions.push(GetCoursesSuccess({ courses }));
                return actions;
              })
            )
      )
    )
  );

  CreateCourse$ = createEffect(() =>
    this._actions.pipe(
      ofType(ECoursesActions.AddCourse),
      switchMap((payload: { item: ICourseForm }) =>
        this._coursesService.createCourse(payload.item).pipe(
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
    this._actions.pipe(
      ofType(ECoursesActions.DeleteCourse),
      switchMap((payload: { id: number }) =>
        this._coursesService.removeItem(payload.id).pipe(
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
    private _coursesService: CoursesService,
    private _actions: Actions
  ) {}
}
