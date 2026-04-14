import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {NGXLogger} from 'ngx-logger';
import {Globals} from '../../../globals';

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
    return decoded.user.sessionEnd || decoded.sessionEnd;
  }

  public  installToken(token) {
    const jwt = new JwtHelperService();
    const info = jwt.decodeToken(token);

    localStorage.setItem('token', token);
    localStorage.setItem('agency', info.user.agency);
    localStorage.setItem('userRole', info.user.userRole);
    localStorage.setItem('firstName', info.user.firstName);
    localStorage.setItem('lastName', info.user.lastName);
    localStorage.setItem('email', info.user.email);

    this.globals.app.isGSAAdmin = (info.user.userRole === 'Administrator');
    this.globals.app.firstName = info.user.firstName;
    this.globals.app.lastName = info.user.lastName;


  }

  /**
   * constructor
   */
  constructor( private logger: NGXLogger, private globals: Globals ) { }

}
