import { Injectable } from '@angular/core';

import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService extends Http {

  // Customize http service
  constructor(backend: XHRBackend, options: RequestOptions) {
    const token = localStorage.getItem('token'); // your custom token getter function here
    options.headers.set('Authorization', `Bearer ${token}`);
    super(backend, options);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const token = localStorage.getItem('token');
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = { headers: new Headers() };
      }
      options.headers.set('Authorization', `Bearer ${token}`);
    } else {
      // we have to add the token to the url object
      url.headers.set('Authorization', `Bearer ${token}`);
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError(self: HttpService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
      }
      return Observable.throw(res);
    };
  }

}
