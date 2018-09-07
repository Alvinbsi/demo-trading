import { Component } from '@angular/core';

import { UtilityService } from './services/utilities/utilities.services';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as rootReducer from './app.reducer';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'hybse-admin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  constructor( public utils:UtilityService,
               public titleService: Title,
               public store: Store<rootReducer.State> ) { }
  isAuthenticated$:any;
  isMobile:boolean = this.utils.checkMobileDevice();

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(rootReducer.getisAuthenticated);
    console.log('this.isAuthenticated$');
  }
}
