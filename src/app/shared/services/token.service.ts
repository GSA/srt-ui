import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  /**
   * constructor
   */
  constructor(  ) { }

  /**
   * Get JWT Token
   */
  public getToken <String> () {
    return localStorage.getItem('token');
  }
}
