import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Survey } from './shared/survey';

@Injectable()
export class SurveyService {

  // productionURL
  private surveysURL = 'http://ec2-54-145-198-134.compute-1.amazonaws.com:3000/surveys';
  // private surveysURL = 'http://localhost:3000/surveys';

  constructor(private http:Http) { }

  public GetSurveys() {      
      return this.http.get(this.surveysURL)
            .map((response: Response)=> response.json());     
  } 
}
