import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { concat, Observable, of } from 'rxjs';
import { switchMap, map, mergeMap } from 'rxjs/operators';

import { IAppState } from '../state/app.state';

import {
  GetCourses,
  GetCoursesSuccess,
  DeleteCourse,
  ECoursesActions,
  HideLoadMore,
  ShowLoadMore,
  ResetCourses
} from '../actions/courses.actions';
import { CoursesService } from '../../features/courses/services/courses.service';
import {
  searchStr,
  selectCoursesList,
  startToLoad
} from '../selectors/courses.selectors';
import { isNgInjectionToken } from 'ng-mocks';
import { ICourseForm } from 'src/app/features/courses/models/course-form.model';

@Injectable()
export class CoursesEffects {
  // searchStr$: Observable<string> = this._store.select(searchStr);
  // startToLoad$: Observable<number> = this._store.select(startToLoad);

  GetCourses$ = createEffect(() =>
    this._actions.pipe(
      ofType(ECoursesActions.GetCourses),
      mergeMap(
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
              // catchError((error) => of(/* handle error here */))
            )
      )
    )
  );

  CreateCourse$ = createEffect(
    () =>
      this._actions.pipe(
        ofType(ECoursesActions.AddCourse),
        switchMap((payload: { item: ICourseForm }) =>
          this._coursesService.createCourse(payload.item).pipe(
            map(() => {
              const start = 0;
              const count = 3;
              const textFragment = '';

              this._store.dispatch(GetCourses({ start, count, textFragment }));
            })
            // catchError( e => of(failAct()))
          )
        )
      ),
    { dispatch: false }
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
          // catchError( e => of(failAct()))
        )
      )
    )
  );

  constructor(
    private _coursesService: CoursesService,
    private _actions: Actions,
    private _store: Store<IAppState>
  ) {}
}
