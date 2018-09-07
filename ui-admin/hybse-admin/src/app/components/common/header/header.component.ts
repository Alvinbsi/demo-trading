import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/utilities/menu.services';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as rootReducer from '../../../app.reducer';
import * as auth from '../../../shared/auth.action';
import { StorageService } from '../../../services/localstorage/storage.service';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';

@Component({
  selector: 'hybse-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public _ms:MenuService,
    public route: Router,
    private _req:ApirequestService,
    private _url:ApiurlsService,
    public _lstore: StorageService,
    public store: Store<rootReducer.State>  ) { }


  toggleAdminNav() {
    this._ms.slideMenuToggle = !this._ms.slideMenuToggle;
  }

  loggingOut() {

    this._req.fetchApiData(this._url.logOutUrl,{}).subscribe(
      (data:any) => {
        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') {
          this.store.dispatch(new auth.LogoutAuthentication() );
          this._lstore.clearStorage();
          this.route.navigate(['/login']);
        }

      }
    )

  }
  ngOnInit() {
  }

}
