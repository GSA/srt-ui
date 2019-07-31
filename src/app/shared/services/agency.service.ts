import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Agency } from '../agency';
import { environment } from '../../../environments/environment';

@Injectable()
export class AgencyService {

  /* ATTRIBUTES */

  private agenciesUrl = environment.SERVER_URL + '/agencies';

  /* CONSTRUCTORS */

  /**
   * constructor
   * @param http
   */
  constructor(
    private http: Http
  ) { }

  /**
   * Get agencies
   */
  public GetAgencies() {
      return this.http.get(this.agenciesUrl)
            .map((response: Response)=> response.json());
  }
}
