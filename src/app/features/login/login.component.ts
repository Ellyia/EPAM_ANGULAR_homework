import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ILoginData } from 'src/app/core/models/login-data.model';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { IAppState } from 'src/app/store/state/app.state';
import { LoginUser } from 'src/app/store/actions/auth.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  loginDataF = new FormGroup({
    login: new FormControl<string | null>('', Validators.required),
    password: new FormControl<string | null>('', Validators.required)
  });

  constructor(private store: Store<IAppState>) {
    super();
  }

  login(): void {
    const loginPayload = {
      login: this.loginDataF.value.login || null,
      password: this.loginDataF.value.password || null
    };
    console.log(loginPayload);
    this.store.dispatch(LoginUser(loginPayload));
  }
}
