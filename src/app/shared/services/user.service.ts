import { EventEmitter, Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Currentuser } from '../../shared/currentuser';
import { environment } from '../../../environments/environment'

//Services
import { AuthService } from 'app/shared/services/auth.service';
import { HttpService } from './http.service';



@Injectable()
export class UserService {

  /* ATTRIBUTES */

  private removeUserUrl = environment.SERVER_URL + '/user/remove';
  private updateUserUrl = environment.SERVER_URL + '/user/update';
  private userUrl = environment.SERVER_URL + '/user/filter';
  private updatePasswordUrl = environment.SERVER_URL + '/user/updatePassword';
  private checkPasswordUrl = environment.SERVER_URL + '/user/checkPassword';
  private getCurrentUserUrl = environment.SERVER_URL + '/user/getCurrentUser';
  private getUserFromDBUrl = environment.SERVER_URL + '/user/getUserInfo';
  private updateUserInfoUrl = environment.SERVER_URL + '/user/updateUserInfo';

  public updateCurrentUser: EventEmitter<Currentuser>;

  /* CONSTRUCTOR */

  /**
   * constructor
   * @param http
   */
  constructor(
    private http: HttpService,
    private authService : AuthService
  ) {
    this.updateCurrentUser = new EventEmitter();
   }

  /**
   * Get entire user records
   * @param filterParams
   */
  public getUsers(filterParams) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.userUrl, filterParams)
          .map((response: Response) => response.json());
  }

  /**
   * Register a new user
   * @param currentUser
   */
  public saveUser(currentUser: Currentuser){
     this.updateCurrentUser.emit(currentUser);
  }


  /**
   * Update User
   * @param updatedUser
   */
  public updateUser(updatedUser) {
    
      return this.http.post(this.updateUserUrl, updatedUser)
              .map((response: Response) => response.json());
  }



  /**
   * Update password
   * @param user
   */
  public updatePassword(filterParams) {
    const body = JSON.stringify(filterParams);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.updatePasswordUrl, body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
 

    /**
   * Get Users.
   * @param filterParams
   */
  public getUserPicAndDate(filterParams) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.getCurrentUserUrl, filterParams, { headers: headers })
      .map((response: Response) => response.json());
  }

  
    /**
   * Get user INFO from database.
   * @param Params
   */
  public getUserFromDatabase(params) {
      const headers = new Headers({'Content-Type': 'application/json'});
      const res = this.http.post(this.getUserFromDBUrl, params, {headers: headers});
      return res.map((response: Response) => {
        return response.json();
      });
    }

  /**
   * Check password
   * @param user
   */
  public checkPassword(oldpassword) {
    const body = JSON.stringify(oldpassword);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.checkPasswordUrl, body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));

  }
  /**
    * Update user profile
    * @param user
    */
  public updateUserInfo(newEmail) {
    const body = JSON.stringify(newEmail);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.updateUserInfoUrl, body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));

  }

 
}
