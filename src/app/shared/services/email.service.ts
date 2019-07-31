import {throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';


import {environment} from '../../../environments/environment';

// Classes
import {HttpClient, HttpHeaders} from '@angular/common/http';

// Services


const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};


@Injectable()
export class EmailService {

  private updatePasswordEmailUrl = environment.SERVER_URL + '/email/updatePassword';
  private resetPasswordEmailUrl = environment.SERVER_URL + '/email/resetPassword';

  /**
   * Constructor.
   * @param http
   */

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Send a email for Change password
   *
   */

  updatePassword() {
    const body = JSON.stringify({});
    return this.http.post<any>(this.updatePasswordEmailUrl, body, httpOptions)
      .catch((error) => observableThrowError(error.json()));
  }


  /**
   * Notification of Reset password
   * @param email
   */
  resetPassword(email) {
    const body = JSON.stringify({email});
    return this.http.post<any>(this.resetPasswordEmailUrl, body, httpOptions)
      .catch((error) => observableThrowError(error.json()));
  }

}
