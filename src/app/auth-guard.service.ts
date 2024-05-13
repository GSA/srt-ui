import { Injectable, inject } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn
} from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  /* ATTRIBUTES */

  public isLogin = false;
  public isGSAAdmin = false;

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
    const url: string = state.url;
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
        (data) => {
          this.isLogin = data.isLogin;
          if (data.isLogin) {
            this.router.navigate([url]).catch(r => console.log(r));
            return true;
          } else {
            this.router.navigate(['/auth']).catch(r => console.log(r));
          }
        });
    }
    return false
  }

  /**
   * check if user is admin
  */
  checkAdmin(): boolean {
    if (this.isGSAAdmin) {
      return true;
    } else {
      this.authService.checkToken().subscribe(
        (data) => {
          this.isGSAAdmin = data.isGSAAdmin;
          if (data.isGSAAdmin) {
            return true;
          } else {
            return false;
          }
        });
    }
  }




  // Kailun's new add

    /**
   * Can activate child?
   * @param next
   * @param state
   */
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLogin();
    // return this.authenticationService.isLogin().map(
    //   data => {
    //     if (data.isLogin) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   },
    //   error => {
    //     return false;
    //   }
    // );
  }
}


export const AuthGuardFn: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthGuard).canActivate(next, state);
}