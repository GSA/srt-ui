import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AnalyticsService {

  // productionURL
  //private link = 'http://ec2-54-145-198-134.compute-1.amazonaws.com:3000';
  private link = 'http://localhost:3000';

  private AnalyticUrl = this.link + '/Analytics'; 
  private AgencyListUrl = this.link + '/AgencyList';  

  constructor ( private http: Http ){};

  
  getAnalytics(param) {      
      return this.http.post(this.AnalyticUrl, param)
          .map((res: Response) => res.json())
          .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  GetAgencyList(){
    var data =  this.http.get(this.AgencyListUrl).map((res: Response) => res.json());    
    return data
  }

}
