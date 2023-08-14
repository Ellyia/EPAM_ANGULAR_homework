import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { IUserName } from '../../models/user-name.model';
import { BaseComponent } from '../base/base.component';
import {
  selectIsAuth,
  selectUser
} from 'src/app/store/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { LogoutUser } from 'src/app/store/actions/auth.actions';
import { ResetCourses } from 'src/app/store/actions/courses.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent {
  title = 'Video course';

  isAuth$: Observable<boolean> = this._store.select(selectIsAuth);
  user$: Observable<IUserName> = this._store.select(selectUser);

  constructor(
    private authService: AuthService,
    private _store: Store<IAppState>
  ) {
    super();
  }

  logout(): void {
    this._store.dispatch(LogoutUser());
    this._store.dispatch(ResetCourses());
  }
}
