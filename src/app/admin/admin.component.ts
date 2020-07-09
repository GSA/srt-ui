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

  scroll(id) {
    const el = document.getElementById(id);
    window.scroll({top: el.offsetTop + 115, behavior: 'smooth'});
  }

}
