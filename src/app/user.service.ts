import { EventEmitter, Injectable } from '@angular/core';
import { Currentuser } from './shared/currentuser';

@Injectable()
export class UserService {
  public updateCurrentUser: EventEmitter<Currentuser>;

  constructor() {
    this.updateCurrentUser = new EventEmitter();
   }

   public saveUser(currentUser: Currentuser){
     this.updateCurrentUser.emit(currentUser);
   }
}
