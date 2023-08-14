import { IUser } from '../models/user.model';
import { ILoginData } from '../models/login-data.model';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { IToken } from '../models/token.model';
import { environment } from 'src/environments/environment.prod';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { selectToken } from 'src/app/store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private lsPropToken = 'token';

  public apiUrl?: string;
  environment = environment;

  token$: Observable<string> = this._store.select(selectToken);

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private _store: Store<IAppState>
  ) {
    this.apiUrl = this.environment.apiUrl;
  }

  login(data: ILoginData): Observable<IToken> {
    return this.http
      .post<IToken>(`${this.apiUrl}/auth/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getUserInfo(): Observable<IUser> {
    // return this._store
    //   .pipe(
    //     select(selectToken),
    //     switchMap((token) => {
    //       return this.http.post<IUser>(`${this.apiUrl}/auth/userinfo`, { token })
    //         .pipe(
    //           catchError(this.errorHandler.bind(this))
    //         );
    //     })
    //   );

    return this.token$.pipe(
      switchMap((token) => {
        return this.http
          .post<IUser>(`${this.apiUrl}/auth/userinfo`, { token })
          .pipe(catchError(this.errorHandler.bind(this)));
      })
    );

    // const token = this.getTokenFromLS();

    // return this.http
    //   .post<IUser>(`${this.apiUrl}/auth/userinfo`, { token })
    //   .pipe(catchError(this.errorHandler.bind(this)));
  }

  getTokenFromLS(): string {
    return localStorage.getItem(this.lsPropToken) || '';
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);

    return throwError(() => error.message);
  }
}
