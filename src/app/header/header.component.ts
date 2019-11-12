// Module: SRTHeaderComponent
import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { Currentuser } from '../shared/currentuser';
import { UserService } from '../shared/services/user.service';
import { AppComponent } from '../app.component';
import { AuthGuard } from '../auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /* ATTRIBUTES */

  @Input() firstName = '';
  public currentID = '';
  @Input() isLogin;
  @Input() isGSAAdmin;

  /* CONSTRUCTORS */

  /**
   * constructor
   * @param authGuard
   * @param app
   * @param authService
   * @param router
   * @param userService
   */
  constructor(
    private authGuard: AuthGuard,
    private app: AppComponent,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
      userService.updateCurrentUser.subscribe(currentUser => this.saveCurrentUser(currentUser));
      if (localStorage.getItem('firstName')) {
        this.firstName = localStorage.getItem('firstName');
        this.currentID = localStorage.getItem('id');
      }
  }

  /**
   * lifecycle
   */
  ngOnInit() {

  }

  popUpMenuKey(event) {
    const focusEl = document.activeElement;
    const dropDown = document.getElementById('gsaDropdown');
    const helloEl = document.getElementById('menu-hello');
    const logoutEl = document.getElementById('menu-logout');
    if (event.keyCode === 38) { // up arrow
      if (focusEl.id === 'menu-logout') {
        helloEl.focus();
      }
    }

    if (event.keyCode === 40) { // down arrow
      if (focusEl.id === 'menu-hello') {
        logoutEl.focus();
      }
    }
  }

  popUpMenuLostFocus() {
    // using setTimeout is kind of a hack but it allows the new element to get focus
    // if you check the document.activeElement right away the whole body of the doc has focus!
    setTimeout( () => {
      const active = document.activeElement;
      const dropdown = document.getElementById('gsaDropdown');
      if ( ! dropdown.contains(active)) {
        this.closeMenus(dropdown);
      }
    }, 250);
  }

  closeMenus(parentElement) {
    const els = parentElement.getElementsByClassName('open');
    for (let e of els) {
      e.classList.remove('open');
    }
  }

  /**
   * lifecycle
   */
  ngOnChanges() {
  }

  /**
   * logout
   * clear user information and remove jwt
   */
  onLogout() {
    const u = new Currentuser('', '', '', '', '', '');
    this.userService.saveUser(u);
    this.authGuard.isLogin = false;
    this.app.isLogin = false;
    this.authService.logout();
    this.router.navigateByUrl('auth').then();
  }

  /**
   * save current user information to localstorage
   * @param currentUser
   * set the firstName of the user for display
   */
  saveCurrentUser(currentUser) {
    this.firstName = currentUser.firstName;
    localStorage.setItem('firstName', currentUser.firstName);
  }

  /**
   * Get hash from URL
   * @param hash
   */
  GetHash(hash) {
      return window.location.href.indexOf(hash) > -1;
  }

  menuClick(location) {
    this.router.navigateByUrl(location);
  }
}
