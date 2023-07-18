import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.loaderService.setLoader(true);

    const token = this.authService.getToken();

    const authRequest = request.clone({
      headers: request.headers.set('Authorization', token)
    });

    return next.handle(authRequest).pipe(
      tap({
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              alert('Unauthorized, oops');

              this.router.navigate(['/login']);
            }
          }
        }
      }),
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests <= 0) {
          this.loaderService.setLoader(false);
        }
      })
    );
  }
}
