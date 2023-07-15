import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ILoginData } from 'src/app/core/models/login-data.model';
import { IToken } from 'src/app/core/models/token.model';

import { Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { IUser } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  loginData: ILoginData = {
    login: '',
    password: ''
  };

  subscription?: Subscription;

  private lsPropToken = 'token';
  private lsPropUser = 'user';

  constructor(private authServise: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  login(): void {
    this.subscription = this.authServise
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
