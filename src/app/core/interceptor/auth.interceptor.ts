import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { finalize, Observable, switchMap, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import {
  selectIsAuth,
  selectToken
} from 'src/app/store/selectors/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  // token$: Observable<string> = this._store.select(selectToken);

  constructor(
    private authService: AuthService,
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

    // return this._store.pipe(
    //   select(selectToken),
    //   switchMap((token) => {
    //     const authRequest = request.clone({
    //         headers: request.headers.set('Authorization', token)
    //       });

    //       console.log(token)

    //     return next.handle(authRequest).pipe(
    //       tap({
    //         error: (err) => {
    //           if (err instanceof HttpErrorResponse) {
    //             if (err.status === 401) {
    //               alert('Unauthorized, oops');
    //               this.router.navigate(['/login']);
    //             }
    //           }
    //         }
    //       }),
    //       finalize(() => {
    //         this.totalRequests--;
    //         if (this.totalRequests <= 0) {
    //           this.loaderService.setLoader(false);
    //         }
    //       })
    //     );
    //   })
    // )

    const token = this.authService.getTokenFromLS();

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
