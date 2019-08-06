
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable} from '@angular/core';





import { Solicitation } from '../shared/solicitation';
import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class SolicitationService {
  /* ATTRIBUTES */

  // pushedSolicitations = new EventEmitter();
  // pushedSolicitation = new EventEmitter();
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

  private feedbackURL = environment.SERVER_URL + '/solicitation/feedback';
  private solicitationsFilterUrl = environment.SERVER_URL +
    '/predictions/filter';
  private solicitationUrl = environment.SERVER_URL + '/solicitation/';
  private emailUrl = environment.SERVER_URL + '/email/';

  /* CONSTRUCTORS */

  /**
   * constructor
   * @param http
   */
  constructor(private http: HttpClient) {

  }


  /**
   * Get filtered solicitations
   * @param body
   */
  getFilteredSolicitations(body) {
    return this.http
      .post<any[]>(this.solicitationsFilterUrl, body)
      .catch((error: any) => {
          console.log(error);
          return observableThrowError(error.json().error || 'Server Error')
        }
      );
  }


  /**
   * Get solicitation
   * @param index
   */
  getSolicitation(index: String): Observable<Solicitation> {
    const solUrl = this.solicitationUrl + index;
    return this.http.get<Solicitation>(solUrl)
      .catch( (error: any ) => {
        console.log(error);
        return observableThrowError(error);
      } );
  }

  /**
   * get feedback of selected solicitation
   * @param filter
   */
  getSolicitationFeedback(filter) {
    console.log(filter);
    return this.http
      .post(this.feedbackURL, filter)
      .catch((error: any) =>
        observableThrowError(error.json().error || 'Server Error')
      );
  }


  /**
   * Send contact email
   * @param emailContent
   */
  sendContactEmail(emailContent) {
    return this.http
      .post(this.emailUrl, emailContent)
      .catch((error: any) =>
        observableThrowError(error.json().error || 'Server Error')
      );
  }

  /**
   * update history of selected solicitation
   * @param solicitation
   */
  updateHistory(solicitation) {
    return this.http
      .post<Solicitation>(this.solicitationUrl, solicitation)
      .catch((error: any) => {
        console.log(error);
        return observableThrowError(error.json().error || 'Server Error');
        }
      );
  }
}
