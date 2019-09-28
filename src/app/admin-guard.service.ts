import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivateChild
} from '@angular/router';
import { AuthService } from './shared/services/auth.service'
import {AuthGuard} from './auth-guard.service';



@Injectable()
export class AdminGuard implements CanActivate {


  /* CONSTRUCTOR */

  /**
   * constructor
   * @param authService
   * @param router
   */
  constructor(
    private authService: AuthService, private router: Router, private authGuard: AuthGuard
  ) {}

  /**
   * is activate
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authGuard.canActivate(route, state) && this.authGuard.isGSAAdmin
  }
}


