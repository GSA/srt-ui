import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../shared/services/user.service';
import {BaseComponent} from '../base.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends BaseComponent implements OnInit {

  /* ATTRIBUTES */
  public activeTab = 'reports';

  /* CONSTRUCTORS */

  /**
   * constructor
   * @param userService
   * @param route
   * @param ts
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
  }

  processMenuClick(s: string) {
    this.activeTab = s;
    console.log(this.activeTab);
  }

  scroll(ID: string) {
    const element = document.getElementById(ID);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start' // This will align the element to the top of the view
      });
    }
  }
}
