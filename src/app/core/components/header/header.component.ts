import { Component } from '@angular/core';
import { IUser } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { IUserName } from '../../models/user-name.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'Video course';

  private lsPropUser = 'user';
  //
  user: IUserName = {
    firstName: '',
    lastName: ''
  };

  constructor(private authServise: AuthService, private router: Router) {}

  ngDoCheck(): void {
    const userStr = localStorage.getItem(this.lsPropUser);

    if (userStr) {
      const userInfo: IUser = JSON.parse(userStr);
      this.user.firstName = userInfo.name?.first;
      this.user.lastName = userInfo.name?.last;
    }
  }
  //
  isAuth(): boolean {
    return this.authServise.isAuthenticated();
  }

  logout(): void {
    this.authServise.logout();
    this.router.navigate(['/login']);
  }
}
