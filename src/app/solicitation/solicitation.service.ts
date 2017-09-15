import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Solicitation } from '../shared/solicitation';
import { environment } from '../../environments/environment'

@Injectable()
export class SolicitationService {
  pushedSolicitations = new EventEmitter();
  pushedSolicitation = new EventEmitter();
  solicitations: any[];
  //reloadSolicitations = true;
  analytics = {
    ScannedSolicitationChart: null,
    MachineReadableChart: null,
    ComplianceRateChart: null,
    ConversionRateChart: null,
    TopSRTActionChart: null,
    TopAgenciesChart: null,
    PredictResultChart: null,
    UndeterminedSolicitationChart: null
  }
  constructor ( private http: Http ){};

  private solicitationsUrl = environment.SERVER_URL + '/predictions';
  private feedbackURL = environment.SERVER_URL + '/solicitation/feedback';
  private ICTUrl = environment.SERVER_URL + '/ICT';
  private solicitationsFilterUrl = environment.SERVER_URL + '/predictions/filter';
  private solicitationUrl = environment.SERVER_URL + '/solicitation/';
  private emailUrl = environment.SERVER_URL + '/email/';
  private AgencyUrl = environment.SERVER_URL + '/Agencies';

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

  getSolicitationFeedback(filter) {
    console.log(filter)
    return this.http.post(this.feedbackURL, filter)
    .map((res: Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  updateHistory(solicitation) {
    //this.reloadSolicitations = true;
    return this.http.post(this.solicitationUrl, solicitation)
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }
}
