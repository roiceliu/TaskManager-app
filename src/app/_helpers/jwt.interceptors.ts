import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "../_services/authentication.service";
import { User } from "../_shared/interfaces";


//JWT interceptor --> adding token header to the http request before sending out from the client-side
@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private auth: AuthenticationService) { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let user:User = this.auth.currentUserValue;
        if (user && user.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        }

        debugger;
        //send request with the added header out
        return next.handle(request);
    }

}