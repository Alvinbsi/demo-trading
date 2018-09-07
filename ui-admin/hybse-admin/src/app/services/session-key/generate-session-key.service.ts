import { Injectable } from '@angular/core';
import { ApiurlsService } from '../api-urls/apiurls.service';
import { ApirequestService } from '../apirequest/apirequest.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GenerateSessionKeyService {

  constructor( private _url: ApiurlsService,
               private _req:ApirequestService,
               private _http: HttpClient ) { }

  generateSessionKey() {
    let data = {};
    this._http.post(this._url.getSessionkeyUrl,data).subscribe(
      data => {

      },
      error => {

      },
      () => {

      }
    )
  }

}
