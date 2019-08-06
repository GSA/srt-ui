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

const state = {
  token_expires : 0,
  refresh_queued : false
}

/**
 * Makes a request to renew the current JWT
 *
 * @param request
 * @param http
 * @param TokenService
 */
function refresh (request: HttpRequest<any>, http: HttpClient, TokenService: TokenService) {
    http.get(environment.SERVER_URL + '/renewToken')
      .subscribe((data: any) => {
        localStorage.setItem('token', data.token);
        state.refresh_queued = false;
      });
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public http: HttpClient, public tokenService: TokenService) {}

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
      setTimeout(() => refresh(request, this.http, this.tokenService), 5000);
      state.refresh_queued = true;
    }

    const token = localStorage.getItem('token');
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(request);
  }
}

