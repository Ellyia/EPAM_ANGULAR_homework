import { IUser } from '../models/user.model';
import { ILoginData } from '../models/login-data.model';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  Subject,
  tap,
  throwError
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { IToken } from '../models/token.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private lsPropToken = 'token';
  private lsPropUser = 'user';

  public apiUrl?: string;
  environment = environment;

  private subject = new BehaviorSubject<IUser | null>(this.getUserFromLS());

  constructor(private http: HttpClient, private errorService: ErrorService) {
    this.apiUrl = this.environment.apiUrl;
  }

  login(data: ILoginData): Observable<IToken> {
    return this.http
      .post<IToken>(`${this.apiUrl}/auth/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  logout(): void {
    localStorage.removeItem(this.lsPropUser);
    localStorage.removeItem(this.lsPropToken);

    this.subject.next(null);
  }

  // isAuthenticated(): boolean {
  //   return !!this.getToken();
  // }

  getUserInfo(): Observable<IUser> {
    const token = this.getToken();

    return this.http
      .post<IUser>(`${this.apiUrl}/auth/userinfo`, { token })
      .pipe(
        tap((user: IUser) => {
          this.subject.next(user);
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  getToken(): string {
    const token = localStorage.getItem(this.lsPropToken);
    return token || '';
  }

  getUserInfoObservable(): Observable<IUser | null> {
    return this.subject.asObservable();
  }

  private getUserFromLS(): IUser | null {
    return JSON.parse(localStorage.getItem(this.lsPropUser) || '{}');
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);

    return throwError(() => error.message);
  }
}
