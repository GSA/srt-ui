
import {throwError as observableThrowError} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';








@Injectable()
export class AnalyticsService {

  /* ATTRIBUTES */

  private AnalyticUrl = environment.SERVER_URL + '/Analytics';
  private AgencyListUrl = environment.SERVER_URL + '/AgencyList';

  /* CONSTRUCTOR */

  /**
   * constructor
   * @param http
   */
  constructor (
    private http: HttpClient
  ) {};


  /**
   * Get Analytics
   * @param param
   */
  getAnalytics (param) {
      return this.http.post<any>(this.AnalyticUrl, param)
          .catch((error: any) => {
            console.log(error);
            return observableThrowError(error.json().error || 'Server Error');
          });
  }

  /**
   * Get agency list
   */
  GetAgencyList() {
    return this.http.get<any>(this.AgencyListUrl)
      .catch((error: any) => {
        console.log(error);
        return observableThrowError(error.json().error || 'Server Error');
      });
  }

}
