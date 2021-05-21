import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { User } from "../_shared/interfaces";
import {environment} from '../../environments/environment'



//AuthenticationService handles validating user credential with the server, mainly on login & logout
@Injectable({ providedIn: 'root' })
export class AuthenticationService{
    //maintain currentUser info; subject maintains original localStorage data of user info with token
    public currentUser: Observable<User>;
    private currentUserSubject: BehaviorSubject<User>;

    constructor(private http: HttpClient) {
        //setup users
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User{
        return this.currentUserSubject.value;
    }

    login(userName: any, password: any) {
        // put user info in a formated package with header + body
        const headers = {
            'Content-Type':'application/x-www-form-urlencoded',
            'Accept': '*/*',
        }

        const body = new HttpParams().set('UserName', userName).set('Password', password).set('grant_type', 'password');

        return this.http.post<any>(`${environment.apiUrl}token`, body,{headers}).pipe(
            map(currentUser => {
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                this.currentUserSubject.next(currentUser);
                return;
            },
                catchError((e) => {
                    throw 'Authentication-Service error in requesting from server. Details:' + e;
            })
            
            )
        )
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    private convert(JsonUser: any): User{
        let user: User = new User();
        user.userName = JsonUser.userName;
        user.token = JsonUser.token_type;
        user.expires = JsonUser['.expires'];
        return user;
    }
}