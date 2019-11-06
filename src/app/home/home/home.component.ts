import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../auth-guard.service';

import { Router } from '@angular/router';
import {BaseComponent} from '../../base.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

  /* ATTRIBUTES */
  currentID: string
  isGSAAdmin = false;

  /* CONSTRUCTORS */

  /**
   * constructor
   * @param auth
   */
  constructor(
    private auth: AuthGuard,
    private router: Router,
    private titleService: Title
  ) {
    super(titleService);
  }

  /**
   * lifecycle
   */
  ngOnInit() {
    this.isGSAAdmin = this.auth.isGSAAdmin;
    this.currentID = localStorage.getItem('id');
    this.pageName = 'SRT Home Page';
    super.ngOnInit();
  }



}
