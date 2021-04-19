
import {throwError as observableThrowError} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';








@Injectable()
export class AnalyticsService {

  /* ATTRIBUTES */

  private AnalyticUrl = environment.SERVER_URL + '/Analytics';
  private AgencyListUrl = environment.SERVER_URL + '/AgencyList';
  private CSVDownloadedSolicitationsReportUrl = environment.SERVER_URL + '/reports/solicitationDownloads?format=csv';
  private CSVPredictionMetricsReportUrl = environment.SERVER_URL + '/reports/predictionMetrics?format=csv';
  private CSVNoticeTypeChangeReportUrl = environment.SERVER_URL + '/reports/noticeTypeChangeReport?format=csv';

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

  /**
   * Get downloaded solicitations report
   */
  GetDownloadedSolicitationsReport() {
    return this.http.get<any>
    (this.CSVDownloadedSolicitationsReportUrl,
      { responseType: 'blob' as 'json'})
      .catch((error: any) => {
        console.log(error);
        return observableThrowError(error.json().error || 'Server Error');
      });
  }

  /**
   * Get prediction metrics report
   */
  GetPredictionMetricsReport() {
    return this.http.get<any>
    (this.CSVPredictionMetricsReportUrl,
      { responseType: 'blob' as 'json'})
      .catch((error: any) => {
        console.log(error);
        return observableThrowError(error.json().error || 'Server Error');
      });
  }

  /**
   * Get notice type change  report
   */
  GetNoticeTypeChangeReport() {
    return this.http.get<any>
    (this.CSVNoticeTypeChangeReportUrl,
      { responseType: 'blob' as 'json'})
      .catch((error: any) => {
        console.log(error);
        return observableThrowError(error.json().error || 'Server Error');
      });
  }



}
