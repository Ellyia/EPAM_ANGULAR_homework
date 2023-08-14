import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { GetUser, SetToken } from './store/actions/auth.actions';
import { selectIsAuth } from './store/selectors/auth.selectors';
import { IAppState } from './store/state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuth$: Observable<boolean> = this._store.select(selectIsAuth);

  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const token = this.authService.getTokenFromLS();

    if (token) {
      this._store.dispatch(SetToken({ token }));
      this._store.dispatch(GetUser({ token }));
      this._router.navigate(['/courses']);
    }
  }
}
