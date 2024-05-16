import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {throwError as observableThrowError,  Observable, catchError, map } from 'rxjs';


@Injectable()
export class ArtService {

  private artURL = environment.ART_API_SERVER + '/v1/get508Languages';


  constructor(private http: HttpClient) { }

  getArtLanguage(art_categories: string[]) {
    let body = {}
    for (let c in art_categories){
      body[art_categories[c]] = true;
    }

    return this.http.post(this.artURL, body)
    .pipe(
      catchError((error: any) => {
        console.log(error);
        return observableThrowError(() => (error.message || 'Server Error'));
      }
    ));
    
  }

}
