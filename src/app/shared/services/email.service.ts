import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// Import envirnoment variable
import { environment } from '../../../environments/environment';

// Classes
import { User } from '../user'; 
import { Email } from '../../shared/data/email';

// Services
import { HttpService } from './http.service'





@Injectable()
export class EmailService {

  private updatePasswordEmailUrl = environment.SERVER_URL + '/email/updatePassword';
  private resetPasswordEmailUrl = environment.SERVER_URL + '/email/resetPassword';
  /**
   * Contructor.
   * @param http
   */

  constructor(
    private http: HttpService
  ) { }

  /**
  * Send a email for Change password
  *
  */

  updatePassword() {
    const body = JSON.stringify({});
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.updatePasswordEmailUrl, body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }


  /**
  * Notification of Reset password
  * @param email
  */
  resetPassword(email) {
    //debugger
    const body = JSON.stringify({ email });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.resetPasswordEmailUrl, body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
