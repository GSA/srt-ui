
import {throwError as observableThrowError,Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

// Class
import { User } from '../user';

import { environment } from '../../../environments/environment'

@Injectable()
export class AuthService {

  /* ATTRIBUTES */

  public static TOKEN = 'token';

  private userUrl = environment.SERVER_URL + '/auth';
  private loginUrl = environment.SERVER_URL + '/auth/login';
  private tokenUrl = environment.SERVER_URL + '/auth/tokenCheck';
  private resetUrl = environment.SERVER_URL + '/auth/resetPassword';
  private updatePasswordByUrL = environment.SERVER_URL + '/auth/email/temp';
  


  /* CONSTRUCTOR */

  /**
   * constructor
   * @param http
   */
  constructor(private http: Http) { }

  /**
   * signup
   * register a new user
   * @param user
   */
  signup(user: User){
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.userUrl, body, {headers: headers})
        .map((response: Response)=> response.json())
        .catch((error: Response) => observableThrowError(error.json()));
  }

  /**
   * login
   * login user.  returns the json web token for the user.
   * @param user
   */
  login(user: User){
    //debugger
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.loginUrl, body, {headers: headers})
        .map((response: Response)=> response.json())
        .catch((error: Response) => observableThrowError(error.json()))
  }


     /**
   * Update password
   * @param user
   */
  // public updatePasswordByUrl() {
  //     debugger
  //   return this.http.get(this.updatePasswordByUrL)
  //     .map((response: Response) => response.json())
  //     .catch((error: Response) => Observable.throw(error.json()));
  // }

  /**
   * logout
   * clear json web token on logout
   */
  logout() {
    localStorage.removeItem("token");
    localStorage.clear();
  }

  /**
   * check token
   */
  checkToken() {
    var body = localStorage;
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.tokenUrl, body, {headers: headers})
        .map((response: Response)=> response.json())
        .catch((error: Response) => observableThrowError(error.json()));
  }


  /**
   * Verify if User is logged in
   */
  isLogin(): boolean {
    return (this.getToken() !== null);

    // const body = { token: this.getToken() };
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // return this.http.post(this.URL_TOKEN, body, { headers: headers })
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }
  


  /**
   * GetToken.
   */
  getToken() {
    return localStorage.getItem(AuthService.TOKEN);
  }

  /**
 * Reset the password.
 */
  resetPassword(email) {
    const body = JSON.stringify({ email });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.resetUrl, body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => observableThrowError(error.json()));
  }

 
  /**
   * Get Current User from localstorage.
   */
  public getCurrent() {
    var current = new User();
    current.id = localStorage.getItem('id');
    current.lastName = localStorage.getItem('lastName');
    current.agency = localStorage.getItem('agency');
    current.position = localStorage.getItem('position');
    current.userRole = localStorage.getItem('userRole');
    return current;
  }


}
