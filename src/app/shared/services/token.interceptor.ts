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
import {NavigationStart, Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {Globals} from '../../../globals';

const state = {
  token_expires : 0,
  refresh_queued : false,
  session_timer: null
};

/**
 * Makes a request to renew the current JWT
 *
 * @param http
 * @param router
 * @param logger
 * @param globals
 * @param tokenService
 */
function refresh (http: HttpClient, router: Router, logger: NGXLogger, globals: Globals, tokenService: TokenService) {
  http.get(environment.SERVER_URL + '/renewToken')
    .subscribe((data: any) => {
      const now = new Date();
      tokenService.installToken(data.token);
      state.refresh_queued = false;  // clear out the queue marker
      let session_timeout =  data.token_life_in_seconds * 1000 || 30 * 60 * 1000;  // default to  30 minutes
      session_timeout += 1000; // add a second to the timeout so it fires AFTER token expiration
      const sessionEndInMS = Math.ceil((TokenService.getSessionExpiration() * 1000) - now.getTime());


      // if there is a session timeout session_timer pending, clear it.
      if (state.session_timer) {
        window.clearTimeout(state.session_timer);
      }

      // create a new session_timer to send the user to the login page if they timeout
      state.session_timer = window.setTimeout(() => {
        const checkTime = new Date();
        // let's double check that our token is really expired
        if ( TokenService.isTokenValid()  &&
             TokenService.getSessionExpiration() > (checkTime.getTime() / 1000) ) {
          logger.debug('exp: ', TokenService.getSessionExpiration());
          logger.debug('time:', checkTime.getTime() / 1000);
          logger.debug('timeout triggered, but token is still valid. expiration is: ', TokenService.getTokenExpirationDate());
        } else {
          globals.app.isLogin = false;
          return router.navigate(['/auth']);
        }
      }, Math.min(session_timeout, sessionEndInMS));

    }, (error) => {
      logger.warn('error renewing token', error);
    });
}


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public http: HttpClient,
              private router: Router,
              private logger: NGXLogger,
              private globals: Globals,
              private tokenService: TokenService) {

    router.events.subscribe( e => {
      if (e instanceof NavigationStart) {
        this.logger.debug('Refreshing token based on Router hook.');
        if ( (! state.refresh_queued)  ) {
          setTimeout(() => refresh(http, router, logger, globals, tokenService), 3000);
          state.refresh_queued = true;
        }
      }
    });
  }

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
      setTimeout(() => refresh(this.http, this.router, this.logger, this.globals, this.tokenService), 3000);
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
        if (error.status === 401) {
          this.logger.debug('Token rejected, redirecting to /auth');
          this.globals.app.isLogin = false;
          return this.router.navigate(['/auth']);
        } else {
          this.logger.error(error);
        }
      }
    );
  }
}

