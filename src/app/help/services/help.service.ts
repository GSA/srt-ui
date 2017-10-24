import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HelpService {

  /* ATTRIBUTES */
  private url = '/assets/faq.json';

  /* CONSTRUCTOR */

  /**
   * constructor
   * @param http
   */
  constructor(
    private http: Http
  ) { }

  /**
   * Get FAQ data
   */
  getFAQs () {
      return this.http.get(this.url)
          .map(res => res.json());
  }
}
