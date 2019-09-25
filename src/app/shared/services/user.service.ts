
import {throwError as observableThrowError} from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';


import { Currentuser } from '../../shared/currentuser';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};


@Injectable()
export class UserService {

  /* ATTRIBUTES */

  private updateUserUrl = environment.SERVER_URL + '/user/update';
  private userUrl = environment.SERVER_URL + '/user/filter';
  private updatePasswordUrl = environment.SERVER_URL + '/user/updatePassword';
  private getUserFromDBUrl = environment.SERVER_URL + '/user/getUserInfo';
  private updateUserInfoUrl = environment.SERVER_URL + '/user/updateUserInfo';

  public updateCurrentUser: EventEmitter<Currentuser>;

  /* CONSTRUCTOR */

  /**
   * constructor
   * @param http
   */
  constructor(
    private http: HttpClient,
  ) {
    this.updateCurrentUser = new EventEmitter();
   }

  /**
   * Get entire user records
   * @param filterParams
   */
  public getUsers(filterParams) {
    return this.http.post<any>(this.userUrl, filterParams);
  }

  /**
   * Register a new user
   * @param currentUser
   */
  public saveUser(currentUser: Currentuser) {
     this.updateCurrentUser.emit(currentUser);
  }


  /**
   * Update User
   * @param updatedUser
   */
  public updateUser(updatedUser) {
      return this.http.post(this.updateUserUrl, updatedUser);
  }


  /**
   * Update password
   * @param filterParams
   */
  public updatePassword(filterParams) {
    const body = JSON.stringify(filterParams);
    return this.http.post<any>(this.updatePasswordUrl, body, httpOptions)
      .catch((error) => observableThrowError(error.json()));
  }


}
