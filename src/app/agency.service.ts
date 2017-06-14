import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Agency } from './shared/agency';

@Injectable()
export class AgencyService {

  // productionURL
  private agenciesUrl = 'http://ec2-54-145-198-134.compute-1.amazonaws.com:3000/agencies';

  // private agenciesUrl = 'http://localhost:3000/agencies';

  constructor(private http: Http) { }

  public GetAgencies() {      
      return this.http.get(this.agenciesUrl)
            .map((response: Response)=> response.json());     
  } 
}
