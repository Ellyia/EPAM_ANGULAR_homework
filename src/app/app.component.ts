import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { GetUserInit, SetToken } from './store/actions/auth.actions';
import { selectIsAuth } from './store/selectors/auth.selectors';
import { IAppState } from './store/state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuth$: Observable<boolean> = this.store.select(selectIsAuth);

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const token = this.authService.getTokenFromLS();

    if (token) {
      this.store.dispatch(SetToken({ token }));
      this.store.dispatch(GetUserInit());
      this.router.navigate(['/courses']);
    }
  }
}
