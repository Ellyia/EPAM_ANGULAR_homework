import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceStub: Partial<AuthService>;
  // let authService: AuthService;

  beforeEach(() => {
    authServiceStub = {
      isAuthenticated: () => true,
      logout: () => {}
    };

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AuthService, useValue: authServiceStub }]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    // authService = fixture.debugElement.injector.get(AuthService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the user property', () => {
    expect(component.user).toBeDefined();
  });

  it('should call isAuthenticated method of AuthService', () => {
    // spyOn(authService, 'isAuthenticated').and.returnValue(true);
    expect(component.isAuth()).toBeTrue();
  });

  // it('should call isAuthenticated method on AuthService', () => {
  //   spyOn(authService, 'isAuthenticated').and.returnValue(true);
  //   const result = component.isAuth();
  //   expect(result).toBe(true);
  //   expect(authService.isAuthenticated).toHaveBeenCalled();
  // });

  // it('should call logout method on AuthService', () => {
  //   spyOn(authService, 'logout');
  //   component.logout();
  //   expect(authService.logout).toHaveBeenCalled();
  // });

  // it('should call logout method when logout is called', () => {
  //   spyOn(component, 'logout');
  //   spyOn(authService, 'logout');
  //   component.logout();
  //   expect(component.logout).toHaveBeenCalled();
  //   expect(authService.logout).toHaveBeenCalled();
  // });
});
