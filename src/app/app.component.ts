import {Component, OnInit} from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './auth-guard.service';

import {Globals} from '../globals';
import {VersionService} from './shared/services/version.service';
import {ClientVersionService} from './shared/services/clientVersion.service';
import {ActivityTrackerService} from './shared/services/activity-tracker.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {

  /* ATTRIBUTES */

  isApproved = false;
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
    private clientVersionService: ClientVersionService,
    private activityTracker: ActivityTrackerService
  ) {
    globals.app = this;

    // Login.gov hand-off. The API finishes the OIDC exchange and redirects to
    // `${srtClientUrl}/auth?info=<encodeURIComponent(JSON.stringify(...))>`
    // carrying the signed JWT. Nothing on the client consumed that parameter,
    // so the token was dropped on the floor and /auth simply re-rendered the
    // sign-in page — which is what "login.gov sends me back to the auth page"
    // looked like. Install the token here, before the constructor's existing
    // checkToken() call and before any route guard evaluates.
    this.consumeLoginGovHandoff();

    const token = localStorage.getItem('token');


    if(token) {
      authService.checkToken().subscribe(
        {
          next: (data) => {
            this.authGuard.isApproved = data.isApproved;
            this.authGuard.isLogin = data.isLogin;
            this.authGuard.isGSAAdmin = data.isGSAAdmin;
            this.isLogin = this.authGuard.isLogin;
            this.isGSAAdmin = this.authGuard.isGSAAdmin;
            this.isApproved = this.authGuard.isApproved;
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
  }

  /**
   * Consume the `?info=` payload the API attaches when redirecting back from
   * Login.gov, install the session, and send the user to the home page.
   *
   * Deliberately reads window.location rather than ActivatedRoute: this runs in
   * the AppComponent constructor, before the router has resolved a route, which
   * is what lets the /home guard see a valid token on the very first navigation.
   *
   * Silent no-op when there is no `info` param, so normal loads are unaffected.
   */
  private consumeLoginGovHandoff(): void {
    let info: string | null = null;
    try {
      info = new URLSearchParams(window.location.search).get('info');
    } catch { return; }
    if (!info) { return; }

    try {
      const payload = JSON.parse(decodeURIComponent(info));
      if (!payload || !payload.token) { return; }

      localStorage.setItem('token', payload.token);
      // Mirror the key names userlogin.component.ts writes, so everything
      // downstream reads the session the same way regardless of how you signed in.
      const fields = ['firstName', 'lastName', 'agency', 'email', 'id', 'userRole'];
      for (const f of fields) {
        if (payload[f] !== undefined && payload[f] !== null) {
          localStorage.setItem(f, String(payload[f]));
        }
      }

      this.globals.app.firstName = payload.firstName || '';
      this.globals.app.lastName = payload.lastName || '';
      this.globals.app.isGSAAdmin = (payload.userRole === 'Administrator');

      // Full-page navigation, NOT router.navigate(). This runs in the
      // constructor, before the router performs its initial navigation — a
      // router.navigate() here is immediately overridden when the router then
      // resolves the current URL (/auth), which lands the user back on the
      // sign-in page even though they are authenticated.
      //
      // location.replace also drops the token-bearing query string from the
      // address bar and leaves no history entry, so Back cannot return to a URL
      // containing a signed JWT.
      window.location.replace('/home');
    } catch (e) {
      // Malformed payload: leave the user on the auth page rather than crashing
      // the app shell. They can retry the sign-in.
      console.error('Login.gov hand-off could not be parsed', e);
    }
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
