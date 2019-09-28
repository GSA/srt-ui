import {Component, OnInit} from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './auth-guard.service';


import {Globals} from '../globals';
import {VersionService} from './shared/services/version.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /* ATTRIBUTES */

  isLogin = false;
  isGSAAdmin = false;
  firstName = '';
  lastName = '';
  version = '';
  buildDate = '';
  environment = '';

  /* CONSTRUCTOR */

  /**
   * constructor
   * @param authGuard
   * @param authService
   * @param globals
   */
  constructor(
    private authGuard: AuthGuard,
    private authService: AuthService,
    private globals: Globals,
    private versionService: VersionService
  ) {
    globals.app = this;
    authService.checkToken().subscribe(
      data => {
        this.authGuard.isLogin = data.isLogin;
        this.authGuard.isGSAAdmin = data.isGSAAdmin;
        this.isLogin = this.authGuard.isLogin;
        this.isGSAAdmin = this.authGuard.isGSAAdmin;
        this.firstName = localStorage.getItem('firstName');
        this.lastName = localStorage.getItem('lastName');

        // debugger
        if (!this.authGuard.isLogin) {
          // don't clear cache here when using MAX CAS prototype
          // localStorage.clear();
        }
      },
      (error) => { console.log(error); }
    );
  }

  ngOnInit() {
    this.versionService
      .getVersionString()
      .subscribe( (data: any) => {
        this.version = data && data.version;
        this.buildDate = data && data.build_date;
        this.environment = data && data.env;
      });
  }

  }
