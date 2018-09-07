import { Injectable } from '@angular/core';
import { ApirequestService } from '../apirequest/apirequest.service';

@Injectable()
export class ServiceUtilsService {

  constructor( private _api: ApirequestService ) { }

  getListItems(url, data, succFunc?: (data) => void, errFunc?: (err) => void, compFunc?: () => void) {
    return this._api.fetchApiData(url,data).subscribe(
      data => {
        if( succFunc != undefined && typeof succFunc == 'function' ) succFunc(data);
      },
      error => {
        if( errFunc != undefined && typeof errFunc == 'function' ) errFunc(error);
      },
      () => {
        if( compFunc != undefined && typeof compFunc == 'function' ) compFunc();
      }
    )
  }


}
