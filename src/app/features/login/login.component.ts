import { Component } from '@angular/core';
import { AuthServise } from '../../core/services/auth.service';
import { ILoginData } from 'src/app/core/models/loginData.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthServise]
})
export class LoginComponent {
  loginData: ILoginData = {
    email: '',
    password: ''
  };

  constructor(private authServise: AuthServise) {}

  login(): void {
    this.authServise.login(this.loginData);
  }
}
