
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';

import { HttpService } from '../../shared/services/http.service';







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
    private http: HttpService
  ) {};


  /**
   * Get Analytics
   * @param param
   */
  getAnalytics (param) {
      return this.http.post(this.AnalyticUrl, param)
          .map((res: Response) => res.json())
          .catch((error:any) => observableThrowError(error.json().error || 'Server Error'));
  }

  /**
   * Get agency list
   */
  GetAgencyList(){
    var data =  this.http.get(this.AgencyListUrl).map((res: Response) => res.json());
    return data
  }

}
