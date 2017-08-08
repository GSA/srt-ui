import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';


import { UserService } from '../../user.service';

@Component({
    selector: 'app-approved',
    templateUrl: './approved.component.html',
    styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {

    filterParams = {
        isAccepted: true,
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

    Remove(user) {
        // this.user.RemoveUser(user).subscribe(
        //     data => {
        //       this.GetUsers()
        //     },
        //     error => {          
        //     }
        // )
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
