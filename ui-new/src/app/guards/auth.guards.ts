import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Store } from '@ngrx/store';
import { Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserloginService } from '../services/login/userlogin.service';



@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild {


    constructor( public route:Router,
                 public _ls: UserloginService ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this._ls.userLoginStatus) {
            return true;
        } else {
            this.route.navigate(['/']);
            return false;
        }
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this._ls.userLoginStatus) {
            return true;
        } else {
            this.route.navigate(['/']);
            return false;
        }
    }
   

}