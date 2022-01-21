
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable} from '@angular/core';





import { Solicitation } from '../shared/solicitation';
import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';


export interface SolicitationResult {
  predictions: Array<Object>;
  first: number;
  rows: number;
  totalCount: number;
}


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

  private feedbackURL = environment.SERVER_URL + '/feedback';
  private solicitationsFilterUrl = environment.SERVER_URL + '/predictions/filter';
  private solicitationUrl = environment.SERVER_URL + '/solicitation/';
  private updateUrl = environment.SERVER_URL + '/solicitation/';
  private emailUrl = environment.SERVER_URL + '/email/';

  public firstLoadFilter: any = null;
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
    if ( ! body.filters) {
      body.filters = { 'active': {'value': true, 'matchMode': 'equals' }};
    } else if (!body.filters.active) {
      body.filters.active = {'value': true, 'matchMode': 'equals' };
    }
    this.firstLoadFilter = null; // this isn't a first load call, so clear this if it's set

    return this.http
      .post<SolicitationResult>(this.solicitationsFilterUrl, body)
      .catch((error: any) => {
          console.log(error);
          return observableThrowError(error.message || 'Server Error');
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
      } ).map ( response => {
        response.url = this.urlFilter(response.url.toString());
        response.parseStatus.forEach(element => {
          element.attachment_url = this.urlFilter(element.attachment_url.toString());
        });
        return response;
      });
  }

  /**
   * get feedback of selected solicitation
   * @param filter
   */
  getSolicitationFeedback(filter) {
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

  update(solicitation) {
    console.log (solicitation);
    const url = `${this.updateUrl}${solicitation.solNum}`;

    return this.http
      .post(url, {solicitation: solicitation})
      .catch( (error: any) => {
        console.log(error);
        return observableThrowError(error || 'Server Error');
      });
  }

  /**
   * This funciton is called on URLs from sam.gov to translate them for our use.
   * For now it only used to replace the domain beta.sam.gov with sam.gov.
   * @param url
   *
   * @return fixedURL
   */

  urlFilter(url: string) {
    const adjusted_url: string =  url.replace('://beta.sam.gov', '://sam.gov');
    return adjusted_url;

  }
}
