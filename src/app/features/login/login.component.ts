import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ILoginData } from 'src/app/core/models/loginData.model';

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

  constructor(private authServise: AuthService) {}

  login(): void {
    this.authServise.login(this.loginData);
  }
}
