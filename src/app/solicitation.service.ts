import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Solicitation } from './shared/solicitation';

@Injectable()
export class SolicitationService {
  pushedSolicitations = new EventEmitter();
  pushedSolicitation = new EventEmitter();

  constructor ( private http: Http ){};
  // private solicitationsUrl = 'http://ec2-54-145-198-134.compute-1.amazonaws.com:3000/predictions';
  // private solicitationsFilterUrl = 'http://ec2-54-145-198-134.compute-1.amazonaws.com:3000/predictions/filter';
  // private solicitationUrl = 'http://ec2-54-145-198-134.compute-1.amazonaws.com:3000/solicitation/';
  // emailUrl = 'http://ec2-54-145-198-134.compute-1.amazonaws.com:3000/email/';

   private solicitationsUrl = 'http://localhost:3000/predictions';
   private solicitationsFilterUrl = 'http://localhost:3000/predictions/filter';
   private solicitationUrl = 'http://localhost:3000/solicitation/';
   private emailUrl = 'http://localhost:3000/email/';

  getFilteredSolicitations(body) {
		console.log(body);
  	return this.http.post(this.solicitationsFilterUrl, body)
	  	.map((res: Response) => res.json())
		.catch((error:any) => Observable.throw(error.json().error || 'Server Error'));  }

// still using?
  pushSolicitations(solicitations: Solicitation[]) {
  	this.pushedSolicitations.emit(solicitations);
  }

  getSolicitation(index: String): Observable<Solicitation> {

    const solUrl = this.solicitationUrl + index;
    return this.http.get(solUrl)
      .map((res: Response) => res.json());

  }


  sendContactEmail(emailContent) {
    return this.http.post(this.emailUrl, emailContent)
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    }


    getData() {
        // Get whole whole data set
        var data =  this.http.get(this.solicitationsUrl).map((res: Response) => res.json());
        return data
    }

  
  updateHistory(solicitation) {
    return this.http.post(this.solicitationUrl, solicitation)
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }
}
