import { IUser } from '../models/user.model';
import { ILoginData } from '../models/loginData.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN = 'token';

  private user: IUser = {
    id: 1,
    firstName: 'FirstName',
    lastName: 'SecondName',
    email: ''
  };
  private lsPropToken = 'token';
  private lsPropUser = 'user';

  login(data: ILoginData): void {
    this.user.email = data.email;
    localStorage.setItem(this.lsPropUser, JSON.stringify(this.user));
    localStorage.setItem(this.lsPropToken, JSON.stringify(this.TOKEN));

    console.log('logged in successfully');
  }

  logout(): void {
    localStorage.removeItem(this.lsPropUser);
    localStorage.removeItem(this.lsPropToken);

    console.log('Logout');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.lsPropToken);
  }

  getUserInfo(): IUser | null {
    const userStr = localStorage.getItem(this.lsPropUser);
    if (userStr) {
      const user: IUser = JSON.parse(userStr as string);

      return user;
    } else {
      return null;
    }
  }
}
