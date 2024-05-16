import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

   /* ATTRIBUTES */

  displayTab = 'singin';

  /**
   * constructor
   */
  constructor() { }

  /**
   * lifecycle
   */
  ngOnInit() {
  }

  /**
   * change tab
   * @param arg
   */
  ChangeDisplay(arg) {
    this.displayTab = arg;
  }

}
