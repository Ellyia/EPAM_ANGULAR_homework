import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { selectIsAuth } from './store/selectors/auth.selectors';
import { IAppState } from './store/state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuth$: Observable<boolean> = this._store.select(selectIsAuth);

  constructor(
    private authServise: AuthService,
    private _store: Store<IAppState>
  ) {}

  // isAuth = (): boolean => {
  //   return this.authServise.isAuthenticated();
  // };
}
