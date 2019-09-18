import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MasqService {

  /* ATTRIBUTES */

  private masqURL = environment.SERVER_URL + '/user/masquerade';

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
  public getMasqueradeToken(agency: String, role: String) {
    return this.http.get<any[]>(`${this.masqURL}?agency=${agency}&role=${role}`);
  }
}
