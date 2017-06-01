import { EventEmitter, Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Currentuser } from './shared/currentuser';

@Injectable()
export class UserService {

  // deployee localhost
  private userUrl = 'http://ec2-54-145-198-134.compute-1.amazonaws.com:3000/user';
  private loginUrl = 'http://ec2-54-145-198-134.compute-1.amazonaws.com:3000/user/login';

  // private userUrl = 'http://localhost:3000/user';
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
      return this.http.get(this.userUrl, filterParams)
            .map((response: Response)=> response.json());     
  } 

}
