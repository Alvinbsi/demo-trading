import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { concatMap, retryWhen, timeout, catchError } from 'rxjs/operators';
import { StorageService } from '../localstorage/storage.service';



@Injectable()
export class ApiDataServices {

  constructor(public _http:HttpClient,
              public _lstore: StorageService ) {

  }

  getApiData( url:any, jsonData:any = {} ) {
      let httpHeaders = new HttpHeaders()
                         .set('Accept', 'application/json');
      // let ls:any = this._lstore.getLocalItems("userData");
      // if(ls != null) {
      //   ls = JSON.parse(ls);
      //   jsonData.idUser = ls.idUser,
      //   jsonData.sessionKey = ls.key
      // }
      return this._http.get(url,{
        params: jsonData
      });
  }

  postApiData( url:any, data:any = {} ) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    // let ls:any = this._lstore.getLocalItems("userData");
    // if(ls != null) {
    //   ls= JSON.parse(ls);
    //   data.idUser = ls.idUser,
    //   data.sessionKey = ls.key
    // }
    return this._http.post(url, data, httpOptions);
  }

  throwApiError( error:any ) {
      console.log(error);
  }

}
