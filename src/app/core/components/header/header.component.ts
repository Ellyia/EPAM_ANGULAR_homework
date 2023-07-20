import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { IUserName } from '../../models/user-name.model';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  title = 'Video course';

  user: IUserName = {
    firstName: '',
    lastName: ''
  };

  constructor(private authServise: AuthService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.subs = this.authServise
      .getUserInfoObservable()
      .subscribe((userInfo) => {
        this.user.firstName = userInfo?.name?.first || '';
        this.user.lastName = userInfo?.name?.last || '';
      });
  }

  isAuth(): boolean {
    return this.authServise.isAuthenticated();
  }

  logout(): void {
    this.authServise.logout();
    this.router.navigate(['/login']);
  }
}
