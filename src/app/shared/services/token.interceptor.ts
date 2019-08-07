import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import {Router} from '@angular/router';

const state = {
  token_expires : 0,
  refresh_queued : false,
  session_timer: null
};

/**
 * Makes a request to renew the current JWT
 *
 * @param request
 * @param http
 * @param TokenService
 * @param router
 */
function refresh (request: HttpRequest<any>, http: HttpClient, TokenService: TokenService, router: Router) {
  http.get(environment.SERVER_URL + '/renewToken')
    .subscribe((data: any) => {
      localStorage.setItem('token', data.token);  // got the new token, so save it
      state.refresh_queued = false;  // clear out the queue marker
      const session_timeout =  data.token_life_in_seconds * 1000 || 30 * 60 * 1000;  // default to 30 minutes

      // if there is a session timeout session_timer pending, clear it.
      if (state.session_timer) {
        window.clearTimeout(state.session_timer);
      }

      // create a new session_timer to send the user to the login page if they timeout
      state.session_timer = window.setTimeout(() => {
        console.log('session timeout');
        return router.navigate(['/auth']);
      }, session_timeout);
    }, (error) => {
      console.log('error renewing token', error);
    });
}


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public http: HttpClient, public tokenService: TokenService, private router: Router ) {}

  /**
   * This interceptor is run for every HTTPS call.
   * It ensures that the JWT is updated frequently so session tokens can be
   * renewed as long as the user is active for at least 30m - the time is
   * configurable on the server side.
   *
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // we don't want to flood the server. Max request rate is once every 5 seconds.
    if ( (! state.refresh_queued) && (!request.url.match('version')) ) {
      setTimeout(() => refresh(request, this.http, this.tokenService, this.router), 5000);
      state.refresh_queued = true;
    }

    const token = localStorage.getItem('token');
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(request).do(
      () => { },
      (error: any) => {
        console.log(error);
        if (error.status === 401) {
          console.log ('navigating away');
          return this.router.navigate(['/auth']);
        }
      }
    );
  }
}

