import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { IUserName } from '../../models/user-name.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'Video course';

  subscr?: Subscription;

  user: IUserName = {
    firstName: '',
    lastName: ''
  };

  constructor(private authServise: AuthService, private router: Router) {}

  ngOnInit(): void {
    const subj = this.authServise.getUserInfoSubj();

    this.subscr = subj.subscribe((userInfo) => {
      this.user.firstName = userInfo?.name?.first || '';
      this.user.lastName = userInfo?.name?.last || '';
    });
  }

  ngOnDestroy(): void {
    this.subscr?.unsubscribe();
  }

  isAuth(): boolean {
    return this.authServise.isAuthenticated();
  }

  logout(): void {
    this.authServise.logout();
    this.router.navigate(['/login']);
  }
}
