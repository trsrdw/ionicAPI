import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { environment } from 'src/environments/environment';

@Injectable()
export class AccessProviders {
    server: string = 'http://localhost/testAPI/api/';

    constructor(
        public http: HttpClient
    ) {}

    async callapilogin (requestBody) {
        const matchup =
          await fetch(environment.login, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers:{
              'Content-Type': 'application/json'
            }
          })
        ;
        let outputRes = Object.assign(matchup);
        return outputRes;
    }

    /* postData(body, file) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset-UTF-8'
        });
        let options = {
            headers: headers
        }

        return this.http.post(this.server + file, JSON.stringify(body), options)
        .timeout(59000)
        .map(res => res);
    } */

}