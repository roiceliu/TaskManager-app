import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import {AuthenticationService} from '../_services/authentication.service'
// use auth guard to prevent unauthorized users to access restricted pages

//providededIn:root --> the decorated class is accessable/seen throughout the application
@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate{
    constructor(private router: Router, private auth: AuthenticationService) { }
    
    
    //override the method from CanActivate interface
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
         //check if user is logged in from se
        if (this.auth.currentUserValue) return true;
        
        //FIXME
        //redirect back
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
