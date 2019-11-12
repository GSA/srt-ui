import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../shared/services/user.service';
import {BaseComponent} from '../base.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent extends BaseComponent implements OnInit {

  /* ATTRIBUTES */
  public accepted: Boolean = false;
  public masq: Boolean = false;

  filterParams = {
    isAccepted: false,
    isRejected: false
  };

  public users: any[];

  /* CONSTRUCTORS */

  /**
   * constructor
   * @param userService
   * @param route
   * @param userService
   * @param route
   */
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private ts: Title
  ) {
    super(ts);
    this.pageName = 'SRT - User Management';
  }

  /**
   * lifecycle
   */
  ngOnInit() {
    super.ngOnInit();
    this.filterParams.isAccepted = true;
    this.filterParams.isRejected = false;
    this.accepted = this.filterParams.isAccepted && !this.filterParams.isRejected;
    this.getUsers();

  }


  /**
   * Approve user
   * @param user
   */
  Approve(user) {
    user.isAccepted = true;
    user.isRejected = false;
    this.userService.updateUser(user).subscribe(
      () => {
        this.getUsers();
      },
      () => {}
    );
  }

  /**
   * reject user
   * @param user
   */
  Reject(user) {
    user.isAccepted = false;
    user.isRejected = true;
    this.userService.updateUser(user).subscribe(
      () => {
        this.getUsers();
      },
      () => {}
    );
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
