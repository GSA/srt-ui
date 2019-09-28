import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../auth-guard.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
  ) { }

  /**
   * lifecycle
   */
  ngOnInit() {
    this.isGSAAdmin = this.auth.isGSAAdmin;
    this.currentID = localStorage.getItem('id');
  }



}
