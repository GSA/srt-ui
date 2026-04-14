import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FeedbackReportService {

  /* ATTRIBUTES */

  private loginReportURL = environment.SERVER_URL + '/reports/feedback';

  /* CONSTRUCTOR */

  /**
   * constructor
   * @param http
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get Feedback Report
   */
  public getFeedbackReport() {
    return this.http.get<any[]>(this.loginReportURL);
  }
}
