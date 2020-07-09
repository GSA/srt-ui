import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientVersionService {

  private versionURL = '/version.html';

  constructor(
    private http: HttpClient
  ) { }

  public getVersionString() {
    const cache_buster = 'timestamp=' + (new Date()).getTime();
    return this.http.get<any[]>(`${this.versionURL}?${cache_buster}`);
  }

}
