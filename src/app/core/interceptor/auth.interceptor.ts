import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { finalize, Observable, switchMap, take, tap } from 'rxjs';

import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { selectToken } from 'src/app/store/selectors/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private _store: Store<IAppState>
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.loaderService.setLoader(true);

    return this._store.pipe(
      select(selectToken),
      take(1),
      switchMap((token) => {
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
      })
    );
  }
}
