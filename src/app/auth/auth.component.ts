import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

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
  constructor(
    private $gaService: GoogleAnalyticsService
  ) { }

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

  onClickTiles(action: string, label: string) {
    this.$gaService.event(action, 'auth_tiles', label);
  }

}
