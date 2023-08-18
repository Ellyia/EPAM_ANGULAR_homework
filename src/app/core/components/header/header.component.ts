import { Component } from '@angular/core';

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

  isAuth$: Observable<boolean> = this.store.select(selectIsAuth);
  user$: Observable<IUserName> = this.store.select(selectUser);

  constructor(private store: Store<IAppState>) {
    super();
  }

  logout(): void {
    this.store.dispatch(LogoutUser());
    this.store.dispatch(ResetCourses());
  }
}
