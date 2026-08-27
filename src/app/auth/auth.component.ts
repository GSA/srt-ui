import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { AuthGuard } from '../auth-guard.service';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: false
})
export class AuthComponent implements OnInit {

   /* ATTRIBUTES */

  displayTab = 'singin';
  isApproved = false;
  isLogin = false;
  isGSAAdmin = false;

  /**
   * constructor
   */
  constructor(
    private authGuard: AuthGuard,
    private $gaService: GoogleAnalyticsService,
  ) { }

  /**
   * lifecycle
   */
  ngOnInit() {
    this.isLogin = this.authGuard.isLogin;
    this.isGSAAdmin = this.authGuard.isGSAAdmin;
    this.isApproved = this.authGuard.isApproved;
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
