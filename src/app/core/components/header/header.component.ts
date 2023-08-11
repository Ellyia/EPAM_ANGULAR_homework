import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
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
// import { GetAuth } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent {
  title = 'Video course';

  // isAuth$: Observable<boolean> = this._store.select(selectIsAuth);
  // user$: Observable<IUserName> = this._store.select(selectUser);
  user: IUserName = {
    firstName: '',
    lastName: ''
  };

  constructor(
    private authServise: AuthService,
    private router: Router,
    private _store: Store<IAppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.subs = this.authServise
      .getUserInfoObservable()
      .subscribe((userInfo) => {
        this.user.firstName = userInfo?.name?.first || '';
        this.user.lastName = userInfo?.name?.last || '';
      });
  }

  isAuth(): boolean {
    return this.authServise.isAuthenticated();
  }

  logout(): void {
    this._store.dispatch(LogoutUser());
    // this.authServise.logout();
    // this.router.navigate(['/login']);
  }
}
