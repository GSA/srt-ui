import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SurveyService {

  /* ATTRIBUTES */

  private surveysURL = environment.SERVER_URL + '/surveys';

  /* CONSTRUCTOR */

  /**
   * constructor
   * @param http
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get Surveys from json file
   */
  public getSurveys() {
      return this.http.get<any[]>(this.surveysURL);
  }
}
