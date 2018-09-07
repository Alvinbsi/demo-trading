import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { concatMap, retryWhen, timeout, catchError, mergeMap } from 'rxjs/operators';
import { StorageService } from '../localstorage/storage.service';
import { ApiurlsService } from '../api-urls/apiurls.service';



@Injectable()
export class ApiDataServices {

  constructor(public _http:HttpClient,
              public _url: ApiurlsService,
              public _lstore: StorageService ) {

  }

  getApiData( url:any, jsonData:any = {}, key:boolean = true ) {
      let httpHeaders = new HttpHeaders()
                         .set('Accept', 'application/json');
      let ls:any = this._lstore.getLocalItems("userData");
      let keyData;
      if(ls != null) {
        ls = JSON.parse(ls);
        jsonData.idUser = ls.idUser;
      }
      if(key) {
        keyData = {
          idUser: ls.idUser,
          publicKey: ls.key.publicKey,
          accessKey: ls.key.AccessKey
        };
        return this._http.post(this._url.getSessionkeyUrl,keyData).pipe(
          mergeMap( (data:any) => {
            console.log('keyData',data);
            jsonData.sessionKey = data.data;
            jsonData.publicKey = ls.key.publicKey;
            jsonData.accessKey = ls.key.AccessKey;
            return this._http.get(url,{
              params: jsonData
            });
          }
        )
        );
      } else {
        return this._http.get(url,{
          params: jsonData
        });
      }
  }

  /*
  e.prototype.getApiData = function(e, n) {
      (new Pp).set("Accept", "application/json");
      var t = this._lstore.getLocalItems("userData");
      if ("" == n && (n = {}), null != t) {
          var l = JSON.parse(t);
          n.idUser = l.id, n.sessionKey = l.session
      }
      return this._http.get(e, {
          params: n
      })
  }, e.prototype.postApiData = function(e, n) {
      var t = {
              headers: new Pp({
                  "Content-Type": "application/json"
              })
          },
          l = this._lstore.getLocalItems("userData");
      if (null != l) {
          var o = JSON.parse(l);
          n.idUser = o.id, n.sessionKey = o.session
      }
      return this._http.post(e, n, t)
  }
  postApiData( url:any, jsonData?:any ) {
      let httpHeaders = new HttpHeaders()
                         .set('Content-Type', 'application/json' );

      console.log('url',url);

      return this._http.post(url, {
        headers: httpHeaders,
        params: jsonData
      });
  }*/

  postApiData( url:any, jsonData:any = {}, key:boolean = true ) {
    const httpOptions = {
      headers: new HttpHeaders({
        //'Access-Control-Allow-Origin':'*',
        'Content-Type':  'application/json'
      })
    };
    let ls:any = this._lstore.getLocalItems("userData");
    if(ls != null) {
      ls = JSON.parse(ls);
      jsonData.idUser = ls.idUser;
      // jsonData.sessionKey = ls.key;
      console.log('ls',ls);
    }

    if(key) {
      let keyData = {
        idUser: ls.idUser,
        publicKey: ls.key.publicKey,
        accessKey: ls.key.AccessKey,
      };
      return this._http.post(this._url.getSessionkeyUrl,keyData).pipe(
        mergeMap( (data:any) => {
          console.log('keyData',data);
          jsonData.sessionKey = data.data;
          jsonData.publicKey = ls.key.publicKey;
          jsonData.accessKey = ls.key.AccessKey;
          return this._http.post(url, jsonData, httpOptions);
         })
      );
    } else {
      return this._http.post(url, jsonData, httpOptions);
    }
  }

  throwApiError( error:any ) {
      console.log(error);
  }

}
