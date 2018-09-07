import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StorageService } from '../localstorage/storage.service';


@Injectable()
export class DataCommunication {
  constructor( private _lstore:StorageService) {
    this.getCompanyId();
    this.getuserId();
  }
  companyID:any = '';
  userID:any = '';
  sessionKey:string = '';
  publicKey:string = '';

  getCompanyId() {
    let companyInfo:any = this._lstore.getLocalItems('company');
    if(companyInfo != null) {
      companyInfo = JSON.parse(companyInfo);
      this.companyID = companyInfo.idCompany;
    } else {
      this.companyID = 2;
    }
  }

  getuserId() {
    let userInfo:any = this._lstore.getLocalItems('userData');
    //alert(userInfo);
    if(userInfo != null) {
      userInfo = JSON.parse(userInfo);
      this.userID = userInfo.idUser || userInfo.id;
      this.sessionKey = userInfo.sessionKey;
      this.publicKey = userInfo.publicKey;
      alert(this.userID);
      console.log('this.userID',this.userID);
      console.log('this.sessionKey',this.sessionKey);
      console.log('this.publicKey',this.publicKey);
    } else {
      this.userID = 6;
    }
  }
}
