import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as rootReducer from '../../app.reducer';



@Injectable()
export class LoginService {

  constructor(public store: Store<rootReducer.State>) { }


  getAuthenticated() {
    let authentication = false;
    this.store.subscribe(
        data => {
          authentication = data.auth.isAuthenticated;
        }
    );
    console.log('authentication',authentication);
    return authentication;
  }
}
