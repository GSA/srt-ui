import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

    filterParams = {
        isAccepted: false,
        isRejected: false
    }

    public users: any[];
    constructor(private user: UserService) { }
    
    ngOnInit() {
        this.GetUsers()
    }

    Approve(user) {      
        user.isAccepted = true;
        user.isRejected = false;
        this.user.UpdateUser(user).subscribe(
            data => {
              this.GetUsers()
            },
            error => {          
              console.log(error)
            }
        )
    }

    Reject(user) {      
        user.isAccepted = false;
        user.isRejected = true
        this.user.UpdateUser(user).subscribe(
            data => {
              this.GetUsers()
            },
            error => {          
              console.log(error)
            }
        )
    }

    GetUsers() {
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
