import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { StorageService } from '../../../services/localstorage/storage.service';



@Component({
  selector: 'hybse-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})


export class AccountActivationComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router: Router, private _req: ApirequestService, private _urls:ApiurlsService,private _lstore: StorageService ) { }

    activationMessage = 'Please wait,your account is being activated';
    activationStatus:boolean = false;
    userDetail:any;
    buttonText:string = '';
    showLoader:boolean = true;
    storageKey = { user: 'user',Username: 'Username' ,userType: 'userType', userData:'userData' }
    userDetailErr:any;

  companyRegistration(data:any) {

    //   console.log(data);
      this._req.fetchApiData(this._urls.activationUrl,data).subscribe(
          (data:any) => {
                //   console.log('Account Activation', data);
                  let response = data;
                  this.userDetail = data.data;
                  this.userDetailErr = data.error;
                  console.log(this.userDetailErr);
                  if(response.data != ''){
                    let userData = { id: response.data.idUser, Username: response.data.username, sessionKey:  response.data.Key.sessionKey };
                    this._lstore.setLocalItem( this.storageKey.userData, userData );
                    this._lstore.setLocalItem(this.storageKey.user, response.data.idUser);
                    this._lstore.setLocalItem(this.storageKey.userType, response.data.userType);
                    let userType = this._lstore.getLocalItems(this.storageKey.userType);
                    this._lstore.storageVal.next(userType);

              if(this.userDetail.status == 'active') {
                  //this.activationMessage = 'Account Activated';
                  //this.activationStatus = true;
                  //if(this.userDetail.userType == 'Issuer' ) {
                  //    this.buttonText = 'Click Here to register Company';
                  //} else {
                  //    this.buttonText = 'Go to Login';
                  //}
                  this.goToLogin();
               } 
               
               else{
                this.showLoader = false;
                 this.activationMessage=response.error['Error Description'];
              }

            
                  }
                  else{
                    this.showLoader = false;
                     this.activationMessage=response.error['Error Description'];
                  }
                  
                
          }
      );
  }


    goToLogin() {
        if(this.userDetail.newReg == '1' ) {
            this.router.navigate(['/issuerRegister/'+this.userDetail.idUser]);
        } else {
            this.router.navigate(['/companylist']);

        }

    }
  ngOnInit() {
    localStorage.clear();
    this.route.queryParams.subscribe(
        params => {
            // console.log('Query',params);
            if( params.id ) {
                this.companyRegistration(params);
            }

        }
    )
  }

}
