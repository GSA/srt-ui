import { EventEmitter, Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Currentuser } from './shared/currentuser';

@Injectable()
export class UserService {

  // productionURL
  //private link = 'http://ec2-54-145-198-134.compute-1.amazonaws.com:3000';
  private link = 'http://localhost:3000';

  private userUrl = this.link + '/user/filter';
  private updateUserUrl = this.link + '/user/update';
  private removeUserUrl = this.link + '/user/remove';
  private loginUrl = this.link + '/user/login';

  // private userUrl = 'http://localhost:3000/user/filter';
  // private updateUserUrl = 'http://localhost:3000/user/update';
  // private removeUserUrl = 'http://localhost:3000/user/remove';
  // private loginUrl = 'http://localhost:3000/user/login';  

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
