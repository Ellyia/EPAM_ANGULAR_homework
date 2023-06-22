import { Component } from '@angular/core';
import { AuthServise } from './core/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authServise: AuthServise) {}

  isAuth = (): boolean => {
    return this.authServise.isAuthenticated();
  };
}
