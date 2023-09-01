import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from 'rxjs';
import {AuthenticationService} from "./authentication.service";
import {TokenStorageService} from "./token-storage.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private _tokenService: TokenStorageService, private _authService: AuthenticationService, private _toast: ToastrService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    let token = this._tokenService.getToken();

    if (token != null) {
      authReq = AuthorizationInterceptor.addTokenHeader(request, token);
    }
    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/signIn') && error.status === 401) {
        console.log("Token Expire will handle401Error");
        return this.handle401Error(authReq, next);
      }
      return throwError(error);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this._tokenService.getRefreshToken();
      console.log("Current Refresh Token " + token);
      if (token) {
        return this._authService.refreshToken(token).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            const newToken = token.tokenType + " " + token.accessToken;
            console.log("New Token : " + newToken);

            this._tokenService.setToken(newToken);
            this.refreshTokenSubject.next(newToken);

            return next.handle(AuthorizationInterceptor.addTokenHeader(request, newToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this._authService.logout();
            this._toast.error("Opps..!! Session has expired.", '', {
              timeOut: 3000,
              positionClass: 'toast-bottom-center',
            })
            return throwError(err);
          })
        );
      }
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(AuthorizationInterceptor.addTokenHeader(request, token)))
    );
  }


  private static addTokenHeader(request: HttpRequest<any>, token: string) {
    /* for Spring Boot back-end */
    // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

    return request.clone({setHeaders: {Authorization: `${token}`}});

    /* for Node.js Express back-end */
    //return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token) });
  }
}
