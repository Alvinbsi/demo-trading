import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StorageService } from '../localstorage/storage.service';

@Injectable()
export class ApiDataServices {

  constructor(public _http:HttpClient, private _ls:StorageService) {

  }

  getApiData( url:any, jsonData:any = {} ) {
      let httpHeaders = new HttpHeaders()
                         .set('Accept', 'application/json');

      // return this._http.get(url, {
      //   headers: httpHeaders,
      //   params: jsonData
      // });
      let ls:any = this._ls.getLocalItems('userData');
      // alert(ls);
      if( ls != null ) {
        ls = JSON.parse(ls);
        jsonData.idUser = ls.id;
        jsonData.publicKey = ls.publicKey;
        jsonData.sessionKey = ls.sessionKey;
        return this._http.get(url,jsonData );
      } else {
        return this._http.get(url);
      }

      //return this._http.get(url);
      
  }

  /*postApiData( url:any, jsonData?:any ) {
      let httpHeaders = new HttpHeaders()
                         .set('Content-Type', 'application/json' );

      console.log('url',url);

      return this._http.post(url, {
        headers: httpHeaders,
        params: jsonData
      });
  }*/

  postApiData( url:any, jsonData:any = {} ) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    let ls:any = this._ls.getLocalItems('userData');
    // alert(ls);
    if( ls != null ) {
      ls = JSON.parse(ls);
      jsonData.idUser = ls.id;
      jsonData.publicKey = ls.publicKey;
      jsonData.sessionKey = ls.sessionKey;
      // console.log('jsonDAta',jsonData);
      return this._http.post(url, jsonData );
    } else {
      return this._http.post(url,jsonData);
    }
    //return this._http.post(url,jsonData);
  }

  postUpload(url:any,data?:any) {
    return this._http.post(url,data,{
      reportProgress: true,
      observe: 'events'
    })
  }

  throwApiError( error:any ) {
      console.log(error);
  }

}
