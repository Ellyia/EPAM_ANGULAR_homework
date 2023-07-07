import { Component } from '@angular/core';
import { IUser } from '../../models/user.model';
import { USER } from '../../../assets/static/mock-user';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: IUser = USER;
  title = 'Video course';

  isAuth = (): boolean => {
    return this.authServise.isAuthenticated();
  };

  constructor(private authServise: AuthService, private router: Router) {}

  logout(): void {
    this.authServise.logout();
    this.router.navigate(['/login']);
  }
}
