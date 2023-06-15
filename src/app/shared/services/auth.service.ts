
import {throwError as observableThrowError, catchError } from 'rxjs';
import { Injectable } from '@angular/core';

// Class
import { User } from '../user';

import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable()
export class AuthService {

  /* ATTRIBUTES */

  public static TOKEN = 'token';

  private userUrl = environment.SERVER_URL + '/auth';
  private loginUrl = environment.SERVER_URL + '/auth/login';
  private tokenUrl = environment.SERVER_URL + '/auth/tokenCheck';
  private resetUrl = environment.SERVER_URL + '/auth/resetPassword';


  /* CONSTRUCTOR */

  /**
   * constructor
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * signup
   * register a new user
   * @param user
   */
  signup(user: User) {
    const body = JSON.stringify(user);
    return this.http.post(this.userUrl, body, httpOptions)
      .pipe(
        catchError( (error: any) => {
        return observableThrowError(() => error)
        }
        ));
  }

  /**
   * login
   * login user.  returns the json web token for the user.
   * @param user
   */
  login(user: User) {
    const body = JSON.stringify(user);
    return this.http.post<any>(this.loginUrl, body, httpOptions)
      .pipe(
        catchError( (error: any) => {
        return observableThrowError(() => error)
        }
        ));
  }


  /**
   * logout
   * clear json web token on logout
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
  }

  /**
   * check token
   */
  checkToken() {
    const body = localStorage;
    return this.http.post<any>(this.tokenUrl, body, httpOptions)
      .pipe(
        catchError( (error: any) => {
        return observableThrowError(() => error)
        }
        ));
  }


  /**
   * Verify if User is logged in
   */
  isLogin(): boolean {
    return (this.getToken() !== null);
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
    return this.http.post(this.resetUrl, body, httpOptions)
      .pipe(
        catchError( (error: any) => {
        return observableThrowError(() => error.json())
        }
        ));
  }


  /**
   * Get Current User from localstorage.
   */
  public getCurrent() {
    const current = new User();
    current.id = localStorage.getItem('id');
    current.lastName = localStorage.getItem('lastName');
    current.agency = localStorage.getItem('agency');
    current.position = localStorage.getItem('position');
    current.userRole = localStorage.getItem('userRole');
    return current;
  }


}
