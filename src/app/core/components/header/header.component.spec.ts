import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../../services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const mockService = jasmine.createSpyObj('AuthService', [
      'logout',
      'isAuthenticated'
    ]);

    TestBed.overrideComponent(HeaderComponent, {
      set: {
        providers: [
          {
            provide: AuthService,
            useValue: mockService
          }
        ]
      }
    });

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the user property', () => {
    expect(component.user).toBeDefined();
  });

  it('should call isAuthenticated method of AuthService', () => {
    mockService.isAuthenticated.and.returnValue(true);
    expect(component.isAuth()).toBeTrue();
    expect(mockService.isAuthenticated).toHaveBeenCalled();
  });

  it('should call logout method of AuthService', () => {
    component.logout();
    expect(mockService.logout).toHaveBeenCalled();
  });
});
