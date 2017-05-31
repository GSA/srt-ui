import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';


import { UserService } from '../../user.service';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {

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
