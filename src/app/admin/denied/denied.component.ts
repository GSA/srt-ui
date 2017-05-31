import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-denied',
  templateUrl: './denied.component.html',
  styleUrls: ['./denied.component.css']
})
export class DeniedComponent implements OnInit {

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
