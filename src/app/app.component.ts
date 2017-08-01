import { Component } from '@angular/core';
import { SolicitationReportComponent } from './report/solicitation-report/solicitation-report.component';
import { AuthService } from './auth/auth.service'
import { AuthGuard } from './auth-guard.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  isLogin = false;
  constructor(
    private authGuard: AuthGuard,
    private authService: AuthService) {
    authService.checkToken().subscribe(
      data=> {          
        this.authGuard.isLogin = data.isLogin;
        this.isLogin = this.authGuard.isLogin;
        if (!this.authGuard.isLogin) localStorage.clear();
      }
    ) 
  }
   
}
