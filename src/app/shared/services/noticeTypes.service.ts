import { Injectable } from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Globals} from '../../../globals';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {throwError as observableThrowError} from 'rxjs/internal/observable/throwError';
import {catchError } from 'rxjs';


@Injectable()
export class NoticeTypesService {

  private noticeTypesUrl = environment.SERVER_URL + '/noticeTypes';

  /**
   * constructor
   */
  constructor( private logger: NGXLogger, private globals: Globals, private http: HttpClient) { }

  /**
   * Get noticeTypes
   */
  public getNoticeTypes() {
    return this.http.get(this.noticeTypesUrl)
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return observableThrowError(() => (error || 'Server Error'));
        }
      ));
  }


}
