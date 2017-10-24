import { EventEmitter, Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Currentuser } from './shared/currentuser';
import { environment } from '../environments/environment'

@Injectable()
export class UserService {

  /* ATTRIBUTES */

  private loginUrl = environment.SERVER_URL + '/user/login';
  private removeUserUrl = environment.SERVER_URL + '/user/remove';
  private updateUserUrl = environment.SERVER_URL + '/user/update';
  private userUrl = environment.SERVER_URL + '/user/filter';

  public updateCurrentUser: EventEmitter<Currentuser>;

  /* CONSTRUCTOR */

  /**
   * constructor
   * @param http
   */
  constructor(
    private http: Http
  ) {
    this.updateCurrentUser = new EventEmitter();
   }

  /**
   * Get entire user records
   * @param filterParams
   */
  public getUsers(filterParams) {
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

}
