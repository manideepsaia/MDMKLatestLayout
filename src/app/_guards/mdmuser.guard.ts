import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class MdmUserGuard implements CanActivate {
    currentUser;
    constructor(private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if(this.currentUser.role === "mdmuser" || this.currentUser.role === "admin"/*||this.currentUser.role==='attorney'*/){
                    return true
                }
            
            
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/']);
        return false;
    }
}

