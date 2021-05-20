import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { IUser } from "../_shared/interfaces";
import {environment} from '../../environments/environment'


//AuthenticationService handles validating user credential with the server, mainly on login & logout
@Injectable({ providedIn: 'root' })
export class AuthenticationService{
    //maintain currentUser info; subject maintains original localStorage data of user info with token
    public currentUser: Observable<IUser>;
    private currentUserSubject: BehaviorSubject<IUser>;

    constructor(private http: HttpClient) {
        //FIXME: what is no currentUser --> pass null
        this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): IUser{
        return this.currentUserSubject.value;
    }

    login(userName:any, password:any) {
        return this.http.post<any>(`${environment.apiUrl}/api/Account/Login`, { userName, password }).pipe(
            map(user => {
                let currentUser: IUser= this.convert(user)
                localStorage.setItem('currentUser', currentUser.toString());
                this.currentUserSubject.next(currentUser);
                return user;
            })
        )
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    private convert(JsonUser: any): IUser{
        let user: IUser;
        user.userName = JsonUser.userName;
        user.token = JsonUser.token_type;
        user.expires = JsonUser['.expires'];
        return user;
    }
}