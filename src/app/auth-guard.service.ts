import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService } from './auth/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {

  /* ATTRIBUTES */

  isLogin = false;
  isGSAAdmin = false;

  /* CONSTRUCTOR */

  /**
   * constructor
   * @param authService
   * @param router
   */
  constructor(
    private authService: AuthService, private router: Router
  ) {}

  /**
   * is activate
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  /**
   * check if use is logged in
   * @param url
   */
  checkLogin(url: string): boolean {
    if (this.isLogin) {
      return true;
    } else {
       this.authService.checkToken().subscribe(
        data => {
          this.isLogin = data.isLogin;
          if (data.isLogin) {
            this.router.navigate([url]);
            return true;
          } else {
            this.router.navigate(['/auth']);
          }
        })
    }
  }
}
