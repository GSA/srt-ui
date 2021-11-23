import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';



@Component({
  selector: 'app-user-report',
  templateUrl: './user.report.component.html',
  styleUrls: ['./user.report.component.css']
})
export class UserReportComponent implements OnInit {

  filterParams = {
    isAccepted: false,
    isRejected: false
  };
  public accepted: Boolean = false;
  public users: any[];

  /* CONSTRUCTORS */
  /**
   * constructor
   */
  constructor(
    private userService: UserService
  ) {
  }

  /**
   * lifecycle
   */
  ngOnInit() {
    this.filterParams.isAccepted = true;
    this.filterParams.isRejected = false;
    this.accepted = this.filterParams.isAccepted && !this.filterParams.isRejected;
    this.getUsers();
  }

  /**
   * Get users
   */
  getUsers() {
    this.userService.getUsers(this.filterParams).subscribe(
      data => {
        this.users = data;
      },
      error => { console.log(error); }
    );
  }



}
