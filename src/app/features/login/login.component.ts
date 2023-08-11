import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ILoginData } from 'src/app/core/models/login-data.model';
import { IToken } from 'src/app/core/models/token.model';

import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { IUser } from 'src/app/core/models/user.model';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { LoginUser } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  loginData: ILoginData = {
    login: '',
    password: ''
  };

  private lsPropToken = 'token';
  private lsPropUser = 'user';

  constructor(
    private authServise: AuthService,
    private router: Router,
    private _store: Store<IAppState>
  ) {
    super();
  }

  login(): void {
    // this._store.dispatch(LoginUser(this.loginData));
    this.subs = this.authServise
      .login(this.loginData)
      .pipe(
        switchMap((data: IToken) => {
          localStorage.setItem(this.lsPropToken, data.token);

          return this.authServise.getUserInfo();
        })
      )
      .subscribe((userData: IUser) => {
        localStorage.setItem(this.lsPropUser, JSON.stringify(userData));

        this.router.navigate(['/courses']);
      });
  }
}
