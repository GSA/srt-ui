import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Survey } from './shared/survey';
import { environment } from '../environments/environment'

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
    private http: Http
  ) { }

  /**
   * Get Surveys from json file
   */
  public getSurveys() {
      return this.http.get(this.surveysURL)
            .map((response: Response) => response.json());
  }
}
