import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ILoginData } from 'src/app/core/models/login-data.model';
import { BaseComponent } from 'src/app/core/components/base/base.component';
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

  constructor(private _store: Store<IAppState>) {
    super();
  }

  login(): void {
    this._store.dispatch(LoginUser(this.loginData));
  }
}
