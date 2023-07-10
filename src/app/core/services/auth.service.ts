import { IUser } from '../models/user.model';
import { ILoginData } from '../models/login-data.model';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { IToken } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private lsPropToken = 'token';
  private lsPropUser = 'user';

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  login(data: ILoginData): Observable<IToken> {
    return this.http
      .post<IToken>('http://localhost:3004/auth/login', data)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  logout(): void {
    localStorage.removeItem(this.lsPropUser);
    localStorage.removeItem(this.lsPropToken);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserInfo(): Observable<IUser> {
    const token = this.getToken();

    return this.http
      .post<IUser>('http://localhost:3004/auth/userinfo', { token })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getToken(): string {
    const token = localStorage.getItem(this.lsPropToken);
    return token || '';
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);

    return throwError(() => error.message);
  }
}
