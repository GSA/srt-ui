import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import {  } from 'rxjs/Rx';
import { Observable } from 'rxjs';

import { User } from './user';
import { environment } from '../../environments/environment'

@Injectable()
export class AuthService {

  /* ATTRIBUTES */

  isLogin;
  private userUrl = environment.SERVER_URL + '/user';
  private loginUrl =  environment.SERVER_URL + '/user/login';
  private tokenUrl =  environment.SERVER_URL + '/user/tokenCheck';

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
        .catch((error: Response) => Observable.throw(error.json()));
  }

  /**
   * login
   * login user.  returns the json web token for the user.
   * @param user
   */
  login(user: User){
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.loginUrl, body, {headers: headers})
        .map((response: Response)=> response.json())
        .catch((error: Response) => Observable.throw(error.json()))
  }

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
        .catch((error: Response) => Observable.throw(error.json()));
  }

  constructor(private http: Http) { }

}
