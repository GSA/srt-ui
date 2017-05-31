import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

    filterParams = {}
    public users: any[];
    constructor(private user: UserService) { }
    
   ngOnInit() {
      
      this.user.GetUsers(this.filterParams).subscribe(
          data => {
            this.users = data;
          },
          error => {          
            console.log(error)
          }
      )
    
  }
}
