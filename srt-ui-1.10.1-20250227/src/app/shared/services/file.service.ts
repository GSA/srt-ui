
import { Injectable } from '@angular/core';



// Services


import {HttpClient} from '@angular/common/http';

@Injectable()
export class FileService {

  constructor(
    private http: HttpClient
  ) { }

}
