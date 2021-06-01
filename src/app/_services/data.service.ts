import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IQuote } from '../_shared/interfaces';

@Injectable({providedIn:'root'})
export class DataService {
    baseUrl: string = environment.apiUrl + 'api/values/';
    header = {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
        
       };

    constructor(private http: HttpClient) { }

    

   //GET ALL quotes
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
            .get<IQuote[]>(this.baseUrl, requestOptions)
            .pipe(
                // catchError( this.handleError)
                catchError((e) => {
                    throw 'DataService error in source. Details:' + e;
                })
            );
    }

    //CREATE quote
    createQuote(data: IQuote) {

        const body = new HttpParams().set("QuoteType", data.QuoteType).set("Contact", data.Contact).set("Task", data.Task).set("TaskType", data.TaskType).set("DueDate", data.DueDate.toDateString());

        //set up reusable header
        return this.http.post<any>(`${this.baseUrl}`, body, { headers: this.header }).pipe(
            catchError((e) => {
                throw "Error occurs in creating quote. Details:" + e;
            })
        )

    }

    //GET QUOTE BY ID
    getQuote(id: number):Observable<IQuote> {
        return this.http.get<IQuote>(`${this.baseUrl+id}`).pipe(
            catchError((e) => {
                throw "Error occurs in creating quote. Details:" + e;
            })
        );
    }

    //UPDATE QUOTE BY ID
    updateQuote(id:number, data: IQuote) {
        const body = new HttpParams().set("QuoteType", data.QuoteType).set("Contact", data.Contact).set("Task", data.Task).set("TaskType", data.TaskType).set("DueDate", data.DueDate.toISOString());
        debugger;
        //set up reusable header
        return this.http.put<any>(`${this.baseUrl+ id}`, body, { headers: this.header }).pipe(
            catchError((e) => {
                throw "Error occurs in updating quote. Details:" + e;
            })
        )
    }

    //DELETE QUOTE BY ID
    deleteQuote(id: number) {
        return this.http.delete<any>(this.baseUrl + id).pipe(
            catchError((e) => {
                throw "Error occurs in deleting quote. Details:" + e;
            })
        );
    }





}
