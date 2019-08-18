import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class TokenService {

  /**
   * Get JWT Token
   */
  public static getToken <String> () {
    return localStorage.getItem('token');
  }

  public static isTokenValid  () {
    const jwt = new JwtHelperService();
    return ( ! jwt.isTokenExpired(TokenService.getToken()) );
  }

  public static getTokenExpirationDate() {
    const jwt = new JwtHelperService();
    return jwt.getTokenExpirationDate(TokenService.getToken());
  }

  public static getSessionExpiration() {
    const jwt = new JwtHelperService();
    const decoded = jwt.decodeToken(TokenService.getToken());
    console.log (decoded);
    return decoded.user.sessionEnd;
  }

  /**
   * constructor
   */
  constructor(  ) { }


  static test() {
    return false;
  }
}
