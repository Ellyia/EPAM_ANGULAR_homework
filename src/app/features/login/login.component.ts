import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ILoginData } from 'src/app/core/models/loginData.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: ILoginData = {
    email: '',
    password: ''
  };

  constructor(private authServise: AuthService, private router: Router) {}

  login(): void {
    this.authServise.login(this.loginData);
    this.router.navigate(['/courses']);
  }
}
