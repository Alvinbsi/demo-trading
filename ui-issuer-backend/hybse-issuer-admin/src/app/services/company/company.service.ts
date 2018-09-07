import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApirequestService } from '../apirequest/apirequest.service';
import { ApiurlsService } from '../api-urls/apiurls.service';
import { DataCommunication } from '../utilities/data.comm';

@Injectable()
export class CompanyService {

  constructor( private _req:ApirequestService,
               private _data: DataCommunication,
               private _url: ApiurlsService ) {
    this.getUserDetails();

  }

  editMode:any = new BehaviorSubject(false);

  companyDetails:any = new BehaviorSubject({});


  getUserDetails() {
    let data = {
      idUser: this._data.userID,
      sessionKey: this._data.sessionKey,
      publicKey: this._data.publicKey
      //idUser: 6,
    };
    alert(this._data.userID);
    alert(this._data.sessionKey);
    alert(this._data.publicKey);
    this._req.fetchApiData(this._url.userDetailUrl,data).subscribe(
      (data:any) => {
        console.log('UserDetails',data);
        let resSucc = data.data;
        let companyID = resSucc.idCompany;
        if( companyID != "N/A" ) this.getCompanyDetails(companyID);
      },
      (err) => {
      },
      () => {

      }
    )
  }

  getCompanyDetails(id) {
    let data = {
      id: id,
      //idUser: this._data.userID,
      //sessionKey: 'd41d8cd98f00b204e9800998ecf8427e'
      sessionKey: this._data.sessionKey
      
    };
    this._req.fetchApiData(this._url.compDetailUrl,data).subscribe(
      (data:any) => {
        let resSucc = data.data;
        let resErr = data.error;
        console.log(resSucc);
        if(resSucc != '')
          this.companyDetails.next(resSucc);
      },
      (err) => {
          //this.companyDetails.next(err);
      },
      () => {

      }
    )
  }
}
