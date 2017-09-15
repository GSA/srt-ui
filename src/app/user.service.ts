import { EventEmitter, Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Currentuser } from './shared/currentuser';
import { environment } from '../environments/environment'

@Injectable()
export class UserService {

  private userUrl = environment.SERVER_URL + '/user/filter';
  private updateUserUrl = environment.SERVER_URL + '/user/update';
  private removeUserUrl = environment.SERVER_URL + '/user/remove';
  private loginUrl = environment.SERVER_URL + '/user/login';

  public updateCurrentUser: EventEmitter<Currentuser>;

  constructor(private http: Http) {
    this.updateCurrentUser = new EventEmitter();
   }

  public saveUser(currentUser: Currentuser){
     this.updateCurrentUser.emit(currentUser);
  }

  // GetUsers()
  public GetUsers(filterParams) {
      return this.http.post(this.userUrl, filterParams)
            .map((response: Response)=> response.json());
  }

  // UpdateUser
  public UpdateUser(updatedUser) {
      return this.http.post(this.updateUserUrl, updatedUser)
              .map((response: Response)=> response.json());
  }


  // Remove User
  public RemoveUser(user) {
      //return "";
  }

}
