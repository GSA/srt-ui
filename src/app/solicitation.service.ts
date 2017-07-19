import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Solicitation } from './shared/solicitation';

@Injectable()
export class SolicitationService {
  pushedSolicitations = new EventEmitter();
  pushedSolicitation = new EventEmitter();
  solicitations: any[];
  reloadSolicitations = true;
  analytics = {
    ScannedSolicitationChart: null,
    MachineReadableChart: null,
    ComplianceRateChart: null,
    ConversionRateChart: null,
    TopSRTActionChart: null,
    TopAgenciesChart: null,
    PredictResultChart: null
  }
  constructor ( private http: Http ){};

  // productionURL
  private link = 'http://ec2-54-145-198-134.compute-1.amazonaws.com:3000';
  // private link = 'http://localhost:3000';

  private solicitationsUrl = this.link + '/predictions';
  private ICTUrl = this.link + '/ICT';  
  private AnalyticUrl = this.link + '/Analytics'; 
  private AgencyUrl = this.link + '/Agencies';  
  private AgencyListUrl = this.link + '/AgencyList';  
  private solicitationsFilterUrl = this.link + '/predictions/filter';
  private solicitationUrl = this.link + '/solicitation/';
  private emailUrl = this.link + '/email/';

  // private solicitationsUrl = 'http://localhost:3000/predictions';
  // private ICTUrl = 'http://localhost:3000/ICT';   
  // private AnalyticUrl = 'http://localhost:3000/Analytics';   
  // private AgencyUrl = 'http://localhost:3000/Agencies';   
  // private AgencyListUrl = 'http://localhost:3000/AgencyList';   
  // private solicitationsFilterUrl = 'http://localhost:3000/predictions/filter';
  // private solicitationUrl = 'http://localhost:3000/solicitation/';
  // private emailUrl = 'http://localhost:3000/email/';

  getFilteredSolicitations(body) {
  	return this.http.post(this.solicitationsFilterUrl, body)
        .map((res: Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));  
  }

// still using?
  pushSolicitations(solicitations: Solicitation[]) {
  	this.pushedSolicitations.emit(solicitations);
  }

  getSolicitation(index: String): Observable<Solicitation> {
    const solUrl = this.solicitationUrl + index;
    return this.http.get(solUrl)
      .map((res: Response) => res.json());
  }


  sendContactEmail(emailContent) {
    return this.http.post(this.emailUrl, emailContent)
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    }


  getData() {
      var data =  this.http.get(this.solicitationsUrl).map((res: Response) => res.json());
      return data
  }

  getICT() {
      var data =  this.http.get(this.ICTUrl).map((res: Response) => res.json());    
      return data
  }

  getAnalytics(param) {      
      return this.http.post(this.AnalyticUrl, param)
          .map((res: Response) => res.json())
          .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  GetAgencyList(){
    var data =  this.http.get(this.AgencyListUrl).map((res: Response) => res.json());    
    return data
  }

  
  updateHistory(solicitation) {
    this.reloadSolicitations = true;
    return this.http.post(this.solicitationUrl, solicitation)
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }
}
