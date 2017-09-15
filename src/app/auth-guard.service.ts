import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService } from './auth/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(private authService:AuthService, private router: Router) {}

  isLogin = false;
  isGSAAdmin = false;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.isLogin)
    {
      return true;
    }
    else
    {
       this.authService.checkToken().subscribe(
        data=> {
          this.isLogin = data.isLogin;
          if (data.isLogin)
          {
            this.router.navigate([url]);
            return true;
          }
          else
          {
            this.router.navigate(['/auth']);
          }
        }
      )
    }
  }
}
