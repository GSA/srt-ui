import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient
  ) { }

  /**
   * Get agencies
   */
  public GetAgencies() {
      return this.http.get(this.agenciesUrl, {responseType: 'json'});
  }
}
