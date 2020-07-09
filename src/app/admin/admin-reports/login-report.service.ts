import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginReportService {

  /* ATTRIBUTES */

  private loginReportURL = environment.SERVER_URL + '/reports/login';

  /* CONSTRUCTOR */

  /**
   * constructor
   * @param http
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get LoginReport
   *
   * Results will look like:
   * { 'mm/dd/yyyy' : { usera: #, userb: #, userc:#},
   *   'mm/dd/yyyy' : { userb: #, userd: #},
   *   'mm/dd/yyyy' : { userz: #, usery: #},
   * }
   */
  public getLoginReport() {
    return this.http.get<any[]>(this.loginReportURL);
  }
}
