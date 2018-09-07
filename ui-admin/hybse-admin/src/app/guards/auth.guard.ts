import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Store } from '@ngrx/store';
import * as rootReducer from '../app.reducer';
import * as auth from '../shared/auth.action';
import { Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../services/login/login.service';



@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild {


    constructor( public route:Router,
                 public store: Store<rootReducer.State>,
                 public _ls: LoginService ) { }

    canActivate() {
        return true;
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this._ls.getAuthenticated()) {
            console.log('this._ls.getAuthenticated()',this._ls.getAuthenticated());
            return true;
        } else {
            this.route.navigate(['/login']);
            return false;
        }
    }
   

}