import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { User } from "../_shared/interfaces";
import {environment} from '../../environments/environment'
import { Router } from "@angular/router";



//AuthenticationService handles validating user credential with the server, mainly on login & logout
@Injectable({ providedIn: 'root' })
export class AuthenticationService{
    //maintain currentUser info; subject maintains original localStorage data of user info with token
    public currentUser: Observable<User>;
    private currentUserSubject: BehaviorSubject<User>;

    constructor(private http: HttpClient, private router: Router) {
        //setup users
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    //{Login status}: check if user still logged in
    public get currentUserValue(): User{
        if (!this.currentUserSubject.value) return null;
        let user: User = this.convert(this.currentUserSubject.value);
        return user;
    }

    //{Login}
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
            }),
            catchError((e) => {
                    throw 'Authentication-Service error  -failed login in requesting from server. Details:' + e;
            })
            
        )
    }

    // {Logout}
    logout() {
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigateByUrl('/login');
    }

    //{Register user}
    register(userName:string, password:string,confirmPassword:string) {
        // put user info in a formated package with header + body
        const headers = {
            'Content-Type':'application/x-www-form-urlencoded',
            'Accept': '*/*',
        }

        const body = new HttpParams().set('Email', userName).set('Password', password).set('ConfirmPassword', confirmPassword);

        return this.http.post(`${environment.apiUrl}api/Account/register`, body, { headers }).pipe(
            catchError((e) => {
                throw 'Authentication-Service error  -failed Register in requesting from server. Details:' + e;
            })
        );
    }


    private convert(JsonUser: any): User{
        let user: User = new User();
        user.userName = JsonUser.userName;
        user.token = JsonUser.access_token;
        user.expires = JsonUser['.expires'];
        return user;
    }
}