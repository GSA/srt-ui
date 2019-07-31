import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';



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
    private http: HttpClient
  ) { }

  /**
   * Get FAQ data
   */
  getFAQs () {
      return this.http.get<any[]>(this.url);
  }
}
