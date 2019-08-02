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

function refresh (request, http, TokenService) {
    console.log ('version check', state);
    console.log (TokenService.getToken());
    http.get(environment.SERVER_URL + '/renewToken')
      .subscribe((data: any) => {
        console.log('in observer')
        console.log(data);
      });
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public http: HttpClient, public tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('intercept');
    console.log(this.http);
    console.log(request.url);

    if ( (! state.refresh_queued) && (!request.url.match('version')) ) {
      console.log ('queuing refresh', state)
      setTimeout(() => refresh(request, this.http, this.tokenService), 10000);
      state.refresh_queued = true;
    } else {
      console.log ('skipping refresh', state);
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

