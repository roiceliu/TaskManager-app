import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IQuote } from '../_shared/interfaces';

@Injectable()
export class DataService {
    baseUrl: string = 'http://localhost:99/';

    constructor(private http: HttpClient) { }

    // Fixme: get dynamic token to
    //use observable to instatiate an asynch data transfer
    getQuotes(): Observable<IQuote[]> {
        const headerDisc = {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization':
                'bearer ' +
                'vHdtNqphcIKhOCLQxP_F-qQfIBLLHzA6mMklYQ7XfEKQ03jpNy6UxffXZE-E63BI1KwYTD2ieNWEOesUJ1q_qpyrfonp3L5FyNBVDCpfukdsIXPCne29njj1Ir1cB-jN93kyiSj48fiTqto6Yi1rAuOFJXChVE53y_Si8whsEl4HZBf4JwQ8es0mnFKVxkdSxJtv5UvOboZA0RyJjg4TxBeWJFBEg5BTCdKkqIIPBBT0-W3fv_QtqeGss_QS8eGoJThsUmKm_QUuAtvoRmqSkn5HDkSrbIu-0xx68_mz_Qm1Sp_fjSM1bJdQymZukh2L7K5gLhzDkj5qkhY1dH-hf2Njd3B-zSshY9zAdmuJWS8eAzM7JXTiTxihgd4BLVUWJuljBkCMlcsrhq7nx06v3f9BJo6o2oEgCAzWHPijadYvl3whwnhdYI7tc3qQScW7whNo_31N8xD2xiLYTOALk3o3H4xB0nUjNPeTS00JZQit0pB-f5XKFrZjDOySa-sh',
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
                    throw 'error in source. Details:' + e;
                })
            );
    }

}
