import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login/login.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as rootReducer from '../../../app.reducer';
import * as auth from '../../../shared/auth.action';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { BlurInputErrorMatcher } from '../../../modules/material/material.errror';
import { StorageService } from '../../../services/localstorage/storage.service';
import { ApiDataServices } from '../../../services/apiservices/api.services';

@Component({
  selector: 'hybse-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public _ls:LoginService,
              public _req: ApiDataServices,
              public _urls: ApiurlsService,
              public _lstore: StorageService,
              public _fb:FormBuilder,
              public route: Router,
              public store: Store<rootReducer.State>  ) { }
  loginForm:FormGroup;
  loginErrMsg:boolean = false;
  showLoader:boolean = false;
  errMsg:string = 'Please Check your email and password';

  matcher = new BlurInputErrorMatcher();

  loginFormInit() {
    this.loginForm = this._fb.group({
        'username': ['', [Validators.required,this.validateEmail]],
        'userpass': ['', [Validators.required]]
      },
      { updateOn: 'submit' }
    );
  }

  validateEmail(input:FormControl) {
    let val = input.value;
    let regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!regex.test(val) && val != '' )  {
      return {
        emailInvalid: true
      }
    }
    return null;
  }

  submitLoginForm() {
    if(this.loginForm.valid) {
      this.showLoader = true;
      let formVal = this.loginForm.value;
      let data = {
        email : formVal.username,
        password : formVal.userpass
      };
      this._req.postApiData(this._urls.loginUrl, data, false ).subscribe(
        (data:any) => {
          let response = data.data;
          let responseErr = data.error;
          this.showLoader = false;
          let keys = response.Key;
          if(response != '') {
            if( response.adminType == 'Admin' ||  response.adminType == 'SuperAdmin' ) {
              this.store.dispatch(new auth.LoginAuthentication() );
              //this.route.navigate(['/dashboard']);
              this._lstore.setLocalItem('userData', { idUser: response.idUser, key: keys });
              this.route.navigate(['/admin/user-lists']);

            } else {
              this.loginErrMsg = true;
              this.errMsg = 'Login Access Denied';
            }
          }

          if(responseErr != '') {
            this.loginErrMsg = true;
            this.errMsg = responseErr['Error Description'] != '' ? responseErr['Error Description'] : responseErr['Error Msg'];
          }

        },
        error => {

        },
        () => {

        }
      );
    }
  }
  ngOnInit() {
    this.loginFormInit();
  }

}
