import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-denied',
  templateUrl: './denied.component.html',
  styleUrls: ['./denied.component.css']
})
export class DeniedComponent implements OnInit {

    filterParams = {
        isAccepted: false,
        isRejected: true
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
            }
        )
    }

    GetUsers() {
        this.user.GetUsers(this.filterParams).subscribe(
            data => {
              this.users = data;
            },
            error => {          
            }
        )
    }

}
