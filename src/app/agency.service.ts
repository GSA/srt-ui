import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Agency } from './shared/agency';
import { environment } from '../environments/environment';

@Injectable()
export class AgencyService {

  // productionURL
  private agenciesUrl = environment.SERVER_URL + '/agencies';

  constructor(private http: Http) { }

  public GetAgencies() {
      return this.http.get(this.agenciesUrl)
            .map((response: Response)=> response.json());
  }
}
