import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../state/app.state';

import {
  GetCourses,
  GetCoursesSuccess,
  DeleteCourse,
  ECoursesActions,
  HideLoadMore,
  ShowLoadMore
} from '../actions/courses.actions';
import { CoursesService } from '../../features/courses/services/courses.service';
import { selectCoursesList } from '../selectors/courses.selectors';
import { isNgInjectionToken } from 'ng-mocks';
import { ICourseForm } from 'src/app/features/courses/models/course-form.model';

@Injectable()
export class CoursesEffects {
  GetCourses$ = createEffect(
    () =>
      this._actions.pipe(
        ofType(ECoursesActions.GetCourses),
        switchMap(
          (payload: { start: number; count: number; textFragment: string }) =>
            this._coursesService
              .getList(payload.start, payload.count, payload.textFragment)
              .pipe(
                // switchMap((courses) => of(GetCoursesSuccess({ courses })))
                map((courses) => {
                  // console.log(courses);
                  if (courses.length < 3) {
                    this._store.dispatch(HideLoadMore());
                  } else {
                    this._store.dispatch(ShowLoadMore());
                  }

                  this._store.dispatch(GetCoursesSuccess({ courses }));
                })
                // catchError( e => of(failAct()))
              )
        )
      ),
    { dispatch: false }
  );

  CreateCourse$ = createEffect(
    () =>
      this._actions.pipe(
        ofType(ECoursesActions.AddCourse),
        switchMap(
          (payload: { item: ICourseForm }) =>
            this._coursesService.createCourse(payload.item)
          // .pipe(
          //   // switchMap((courses) => of(GetCoursesSuccess({ courses })))
          //   map((courses) => {
          //     // console.log(courses);
          //     this._store.dispatch(GetCoursesSuccess({ courses }));
          //   })
          //   // catchError( e => of(failAct()))
          // )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private _coursesService: CoursesService,
    private _actions: Actions,
    private _store: Store<IAppState>
  ) {}
}
