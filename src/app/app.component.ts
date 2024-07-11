import {Component, OnInit} from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './auth-guard.service';

import {Globals} from '../globals';
import {VersionService} from './shared/services/version.service';
import {ClientVersionService} from './shared/services/clientVersion.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
  clientVersion = '';
  clientBuildDate = '';

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
    private versionService: VersionService,
    private clientVersionService: ClientVersionService
  ) {
    globals.app = this;
    authService.checkToken().subscribe(
      {
        next: (data) => {
        this.authGuard.isLogin = data.isLogin;
        this.authGuard.isGSAAdmin = data.isGSAAdmin;
        this.isLogin = this.authGuard.isLogin;
        this.isGSAAdmin = this.authGuard.isGSAAdmin;
        this.firstName = localStorage.getItem('firstName');
        this.lastName = localStorage.getItem('lastName');
        
        //console.log('data:', data);
        //console.log('this:', this);


        // debugger
        if (!this.authGuard.isLogin) {
          // don't clear cache here when using MAX CAS prototype
          // localStorage.clear();
        }
        },
        error: (err: any) => { console.log(err); }
      }
    );
  }

  ngOnInit() {
    this.versionService
      .getVersionString()
      .subscribe( (data: any) => {
        this.version = data && data.version;
        this.buildDate = data && (data.build_date || data.build_data); // typo work around till we fix the server
        this.environment = data && data.env;
      });

    this.clientVersionService
      .getVersionString()
      .subscribe({
        next: (data: any) => {
          // should come back in the form { "version" : "S4.9" , "build_date" : "2020-01-17.10.46.41" }
          if ( (typeof(data) === 'object') && data.version ) {
            this.clientVersion = ` / ${data.version}`;
            this.clientBuildDate = data.build_date;
          } else {
            this.clientVersion = '';
          }
        },
        error: (err: any) => {
            this.clientVersion = '';
          }
      });
        
  }

}
