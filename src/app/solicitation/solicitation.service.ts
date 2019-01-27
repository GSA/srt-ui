import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Solicitation } from '../shared/solicitation';
import { environment } from '../../environments/environment'

import { HttpService } from '../shared/services/http.service';

@Injectable()
export class SolicitationService {
  /* ATTRIBUTES */

  pushedSolicitations = new EventEmitter();
  pushedSolicitation = new EventEmitter();
  solicitations: any[];
  analytics = {
    ScannedSolicitationChart: null,
    MachineReadableChart: null,
    ComplianceRateChart: null,
    ConversionRateChart: null,
    TopSRTActionChart: null,
    TopAgenciesChart: null,
    PredictResultChart: null,
    UndeterminedSolicitationChart: null
  };

  private solicitationsUrl = environment.SERVER_URL + "/predictions";
  private feedbackURL = environment.SERVER_URL + "/solicitation/feedback";
  private ICTUrl = environment.SERVER_URL + "/ICT";
  private solicitationsFilterUrl = environment.SERVER_URL +
    "/predictions/filter";
  private solicitationUrl = environment.SERVER_URL + "/solicitation/";
  private emailUrl = environment.SERVER_URL + "/email/";
  private AgencyUrl = environment.SERVER_URL + "/Agencies";

  /* CONSTRUCTORS */

  /**
   * constructor
   * @param http
   */
  constructor(private http: HttpService) {

  }

  /**
   * get data
   */
  getData() {
    var data = this.http
      .get(this.solicitationsUrl)
      .map((res: Response) => res.json());
    return data;
  }

  /**
   * Get filtered solicitations
   * @param body
   */
  getFilteredSolicitations(body) {
    return this.http
      .post(this.solicitationsFilterUrl, body)
      .map((res: Response) => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server Error')
      );
  }

  /**
   * get ICT
   */
  getICT() {
    var data = this.http.get(this.ICTUrl).map((res: Response) => res.json());
    return data;
  }

  /**
   * Get solicitation
   * @param index
   */
  getSolicitation(index: String): Observable<Solicitation> {
    const solUrl = this.solicitationUrl + index;
    return this.http.get(solUrl).map((res: Response) => res.json());
  }

  /**
   * get feedback of selected solicitation
   * @param filter
   */
  getSolicitationFeedback(filter) {
    console.log(filter);
    return this.http
      .post(this.feedbackURL, filter)
      .map((res: Response) => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server Error')
      );
  }

  /**
   * push soliciations
   * @param solicitations
   */
  pushSolicitations(solicitations: Solicitation[]) {
    this.pushedSolicitations.emit(solicitations);
  }

  /**
   * Send contact email
   * @param emailContent
   */
  sendContactEmail(emailContent) {
    return this.http
      .post(this.emailUrl, emailContent)
      .map((res: Response) => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server Error')
      );
  }

  /**
   * update history of selected solicitation
   * @param solicitation
   */
  updateHistory(solicitation) {
    return this.http
      .post(this.solicitationUrl, solicitation)
      .map((res: Response) => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server Error')
      );
  }
}
