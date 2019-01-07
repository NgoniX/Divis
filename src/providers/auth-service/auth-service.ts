import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

// url of api
let apiUrl = 'http://nowizzville.com/api/';

@Injectable()
export class AuthServiceProvider {

  apiUrl: String;	

  constructor(public http: HttpClient) {
    this.apiUrl = apiUrl;
  }

      // post data on register and login
      postData(credentials:any, type:any) : Observable<{}> {
 
        return this.http.post(apiUrl + type, JSON.stringify(credentials)).pipe(
        map(this.extractData),
        catchError(this.handleError)
        );
           
      }

      private extractData(res: Response) {
      let body = res;
      return body || { };
      }

      private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
          const err = error || '';
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
      }


}
