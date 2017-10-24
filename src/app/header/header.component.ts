//Module: SRTHeaderComponent
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { Currentuser } from '../shared/currentuser';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component';
import { AuthGuard } from '../auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /* ATTRIBUTES */

  private firstName = "";
  public currentID = "";
  @Input() isLogin;
  @Input() isGSAAdmin;

  /* CONSTRUCTORS */

  /**
   * constructor
   * @param authGuard
   * @param app
   * @param authService
   * @param router
   * @param user
   */
  constructor(
    private authGuard: AuthGuard,
    private app: AppComponent,
    private authService: AuthService,
    private router: Router,
    private user: UserService
  ) {
      user.updateCurrentUser.subscribe(currentUser => this.saveCurrentUser(currentUser));
      if (localStorage.getItem("firstName")) {
        this.firstName = localStorage.getItem("firstName");
      }
  }

  /**
   * lifecycle
   */
  ngOnInit() {
      this.currentID = localStorage.getItem('id');
  }

  /**
   * lifecycle
   */
  ngOnChanges() {
    console.log(this.isGSAAdmin);
  }

  /**
   * logout
   * clear user information and remove jwt
   */
  onLogout() {
    var u = new Currentuser("", "", "", "", "");
    this.user.saveUser(u);
    this.authGuard.isLogin = false;
    this.app.isLogin = false;
    this.authService.logout();
    this.router.navigateByUrl('auth');
  }

  /**
   * save current user information to localstorage
   * @param currentUser
   * set the firstName of the user for display
   */
  saveCurrentUser(currentUser) {
    this.firstName = currentUser.firstName;
    localStorage.setItem("firstName", currentUser.firstName);
  }

  /**
   * Get hash from URL
   * @param hash
   */
  GetHash(hash) {
      return window.location.href.indexOf(hash) > -1;
  }

}
