import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IQuote } from '../_shared/interfaces';

@Injectable()
export class DataService {
    baseUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // Fixme: get dynamic token to
    //use observable to instatiate an asynch data transfer
    getQuotes(): Observable<IQuote[]> {
        const headerDisc = {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Headers': 'Content-Type',
           };

        //compile header & send to the webAPI
        const requestOptions = {
            headers: new HttpHeaders(headerDisc),
        };
        return this.http
            .get<IQuote[]>(this.baseUrl + 'api/values', requestOptions)
            .pipe(
                // catchError( this.handleError)
                catchError((e) => {
                    throw 'DataService error in source. Details:' + e;
                })
            );
    }

}
