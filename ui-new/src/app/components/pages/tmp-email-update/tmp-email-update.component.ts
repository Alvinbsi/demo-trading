import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { StorageService } from '../../../services/localstorage/storage.service';


@Component({
  selector: 'hybse-tmp-email-update',
  templateUrl: './tmp-email-update.component.html',
  styleUrls: ['./tmp-email-update.component.css']
})
export class TmpEmailUpdateComponent implements OnInit {
  constructor(private route:ActivatedRoute,private router: Router, private _req: ApirequestService, private _urls:ApiurlsService,private _lstore: StorageService ) { }

  activationMessage = 'Please wait,your account is being activated';
  activationStatus:boolean = false;
  userDetail:any;
  buttonText:string = '';
  showLoader:boolean = true;
  storageKey = { user: 'user',Username: 'username' ,userType: 'userType', userData:'userData' }
  userDetailErr:any;

companyRegistration(data:any) {

  //   console.log(data);
    this._req.fetchApiData(this._urls.tempEmailUpdateUrl,data).subscribe(
        (data:any) => {
              //   console.log('Account Activation', data);
                let response = data;
                this.userDetail = data.data;
               
                this.userDetailErr = data.error;
                console.log(this.userDetailErr);
                if(response.data != ''){
                //   let userData = { id: response.data.idUser, Username: response.data.Username, sessionKey:  response.data.Key.sessionKey };
                //   this._lstore.setLocalItem( this.storageKey.userData, userData );
                //   this._lstore.setLocalItem(this.storageKey.user, response.data.idUser);
                //   this._lstore.setLocalItem(this.storageKey.userType, response.data.userType);
                //   let userType = this._lstore.getLocalItems(this.storageKey.userType);
                //   this._lstore.storageVal.next(userType);
                 
            if(this.userDetail.status == 'active') {
                //this.activationMessage = 'Account Activated';
                //this.activationStatus = true;
                //if(this.userDetail.userType == 'Issuer' ) {
                //    this.buttonText = 'Click Here to register Company';
                //} else {
                //    this.buttonText = 'Go to Login';
                //}

                this.router.navigate(['/login']);
               
            } 
          

                }

                else{
                  this.showLoader = false;
                   this.activationMessage=response.error['Error Description'];
                }
                
              
        }
    );
}


ngOnInit() {
    localStorage.clear();
  this.route.queryParams.subscribe(
      params => {
          // console.log('Query',params);
          if( params.idUser ) {
              this.companyRegistration(params);
          }

      }
  )
}

}
