import { Injectable, inject } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn
} from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import {AuthGuard} from './auth-guard.service';



@Injectable({
  providedIn: 'root'
})
export class AdminGuard {


  /* CONSTRUCTOR */

  /**
   * constructor
   * @param authService
   * @param router
   * @param authGuard
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
    if (!(this.authGuard.canActivate(route, state) && this.authGuard.isGSAAdmin)) {
      this.router.navigate(['/auth']).catch(r => console.log(r));
    }
    
    return this.authGuard.canActivate(route, state) && this.authGuard.isGSAAdmin;
  }
}


export const AdminGuardFn: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AdminGuard).canActivate(next, state);
}