import { AuthService } from './auth.service';
import { ILoginData } from '../models/login-data.model';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create service', () => {
    expect(authService).toBeTruthy();
  });

  it('should return true from isAuthenticated() if token exists in local storage', () => {
    localStorage.setItem(
      authService['lsPropToken'],
      JSON.stringify(authService['TOKEN'])
    );

    const isAuthenticated = authService.isAuthenticated();

    expect(isAuthenticated).toBe(true);
  });

  it('should return false from isAuthenticated() if token does not exist in local storage', () => {
    const isAuthenticated = authService.isAuthenticated();

    expect(isAuthenticated).toBe(false);
  });
});
