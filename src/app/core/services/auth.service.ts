import { IUser } from '../models/user.model';

export class AuthServise {
  private USER: IUser = {
    id: 1,
    firstName: 'FirstName',
    lastName: 'SecondName'
  };
  private TOKEN = 'token';
  private EMAIL = '';
  private PASSWORD = '';

  private lsPropToken = 'token';
  private lsPropUser = 'user';
  private lsPropEmail = 'email';
  private lsPropPass = 'password';

  login(email: string, password: string): void {
    console.log('logged in successfully');
    localStorage.setItem(this.lsPropUser, JSON.stringify(this.USER));
    localStorage.setItem(this.lsPropToken, JSON.stringify(this.TOKEN));
    this.EMAIL = email;
    this.PASSWORD = password;
    localStorage.setItem(this.lsPropEmail, JSON.stringify(this.EMAIL));
    localStorage.setItem(this.lsPropPass, JSON.stringify(this.PASSWORD));
  }

  logout(): void {
    console.log('Logout');
    localStorage.removeItem(this.lsPropUser);
    localStorage.removeItem(this.lsPropToken);
    localStorage.removeItem(this.lsPropEmail);
    localStorage.removeItem(this.lsPropPass);
  }

  isAuthenticated(): boolean {
    console.log(!!localStorage.getItem(this.lsPropToken));
    return !!localStorage.getItem(this.lsPropToken);
  }

  getUserInfo(): IUser | null {
    const userStr = localStorage.getItem(this.lsPropUser);
    if (userStr) {
      const user: IUser = JSON.parse(userStr as string);

      return user;
    } else {
      console.log('no info');

      return null;
    }
  }
}
