import { Component } from '@angular/core';
import { AuthServise } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthServise]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authServise: AuthServise) {}

  login(): void {
    this.authServise.login(this.email, this.password);
  }
}
