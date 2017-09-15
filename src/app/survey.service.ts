import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Survey } from './shared/survey';
import { environment } from '../environments/environment'

@Injectable()
export class SurveyService {

  private surveysURL = environment.SERVER_URL + '/surveys';

  constructor(private http:Http) { }

  public GetSurveys() {
      return this.http.get(this.surveysURL)
            .map((response: Response)=> response.json());
  }
}
