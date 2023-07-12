import { IUser } from '../models/user.model';
import { ILoginData } from '../models/login-data.model';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
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

  constructor(private http: HttpClient, private errorService: ErrorService) {
    this.apiUrl = `${this.environment.apiUrl}`;
  }

  login(data: ILoginData): Observable<IToken> {
    return this.http
      .post<IToken>(`${this.apiUrl}/auth/login`, data)
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
      .post<IUser>(`${this.apiUrl}/auth/userinfo`, { token })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getToken(): string {
    const token = localStorage.getItem(this.lsPropToken);
    return token || '';
  }

  // subject = new Subject<string>();

  // getUserName(): void {
  //   if (this.isAuthenticated()) {
  //     const userStr = localStorage.getItem(this.lsPropUser);

  //   this.subject.next(this.userStr);

  //   if (userStr) {
  //     const userInfo: IUser = JSON.parse(userStr);
  //     this.user.firstName = userInfo.name?.first;
  //     this.user.lastName = userInfo.name?.last;
  //   }
  //   }
  // }
  // .subscribe((userStr: string) => {
  //  this.searchItems.emit(searchStr);
  // })

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);

    return throwError(() => error.message);
  }
}
