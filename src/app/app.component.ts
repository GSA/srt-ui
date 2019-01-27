import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service'
import { AuthGuard } from './auth-guard.service'


import { SolicitationReportComponent } from './solicitation/solicitation-report/solicitation-report.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /* ATTRIBUTES */

  isLogin = false;
  isGSAAdmin = false;

  /* CONSTRUCTOR */

  /**
   * constructor
   * @param authGuard
   * @param authService
   */
  constructor(
    private authGuard: AuthGuard,
    private authService: AuthService
  ) {
    authService.checkToken().subscribe(
      data => {
        this.authGuard.isLogin = data.isLogin;
        this.authGuard.isGSAAdmin = data.isGSAAdmin;
        this.isLogin = this.authGuard.isLogin;
        this.isGSAAdmin = this.authGuard.isGSAAdmin;
        // debugger
        if (!this.authGuard.isLogin) {
          localStorage.clear();
        }
      }
    )
  }

}
