import { IUser } from '../models/user.model';
import { ILoginData } from '../models/login-data.model';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, take, throwError } from 'rxjs';
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

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private store: Store<IAppState>
  ) {
    this.apiUrl = this.environment.apiUrl;
  }

  login(data: ILoginData): Observable<IToken> {
    return this.http
      .post<IToken>(`${this.apiUrl}/auth/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getUserInfo(): Observable<IUser> {
    return this.store.pipe(
      select(selectToken),
      take(1),
      switchMap((token) => {
        return this.http
          .post<IUser>(`${this.apiUrl}/auth/userinfo`, { token })
          .pipe(catchError(this.errorHandler.bind(this)));
      })
    );
  }

  getTokenFromLS(): string {
    return localStorage.getItem(this.lsPropToken) || '';
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);

    return throwError(() => error.message);
  }
}
