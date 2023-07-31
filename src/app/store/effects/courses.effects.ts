import { Injectable } from '@angular/core';

import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../state/app.state';

import { GetCourses, ECoursesActions } from '../actions/courses.actions';
import { CoursesService } from '../../features/courses/services/courses.service';
import { selectCoursesList } from '../selectors/courses.selectors';

@Injectable()
export class CoursesEffects {
  @Effect()
  GetCourses$ = this._actions.pipe(
    ofType<GetCourses>(ECoursesActions.GetCourses),
    switchMap(() => this._coursesService.getList())
  );

  constructor(
    private _coursesService: CoursesService,
    private _actions: Actions,
    private _store: Store<IAppState>
  ) {}
}
