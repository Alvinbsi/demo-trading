import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormArray,FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild,ElementRef,HostListener } from '@angular/core';
import { ApiDataServices } from '../../../services/apiservices/api.services';
import { UtilityService } from '../../../services/utilities/utilities.services';
import { UserloginService } from '../../../services/login/userlogin.service';
import { LinkedInService } from 'angular-linkedin-sdk';
import { FacebookService, InitParams,LoginResponse,LoginOptions } from 'ngx-facebook';
import { SocialRegisterationService } from '../../../services/social-register/social-registeration.service';
import { StorageService } from '../../../services/localstorage/storage.service';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';



declare var gapi:any;
declare var grecaptcha:any;
declare var $:any;

@Component({
  selector: 'hybse-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  title = 'hybse';
  Mesg:string = '';
  Authenticate:boolean;
  UserId:string;
  FirstName:string;
  LastName:string;
  newReg:string;
  redirectId:string;
  storageKey = { user: 'user',Username: 'Username' , Email: 'Email' ,userType: 'userType', userData:'userData' }

  constructor(private _fb: FormBuilder,
    private router:Router,
    private _ls:UserloginService,
    public fbs:FacebookService,
    public _sr:SocialRegisterationService,
    private _lInS: LinkedInService,
    public _utils:UtilityService,
    private _lstore: StorageService,
    private _req: ApirequestService,
    private _urls:ApiurlsService

  ) {

     

  }


  forgotPasswordForm:FormGroup;
  forgotPasswordFormValidate:boolean = false;
  disableButton:boolean = false;
  

  forgotPasswordFormInitialize() {
      this.forgotPasswordForm = this._fb.group({
          'email': ['',[Validators.required,this.validateEmail]],
           'captchField': ['', [Validators.required]]

      },
          {updateOn: 'blur'}
      );
  }

  responseSuccess:boolean = false;

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

  showLoader:boolean = false;

  forgotPasswordFormSubmit() {

      this.Mesg="";
      let forgotPasswordData = this.forgotPasswordForm.value;
      this.forgotPasswordFormValidate = true;
      this.showLoader = true;
      if(this.forgotPasswordForm.valid) {
          this.disableButton = true;
          let data = {
              email: forgotPasswordData.email,
                     };

                     this._req.fetchApiData(this._urls.forgotPasswordUrl,data).subscribe(
                        (data:any) => {
                  // console.log('data',data);
                  let response = data;
                  // console.log('Response Data',response.data);
                  if(response.data == '') {
                      if( response.error != '' ){
                        this.showLoader = false;
                        this.disableButton = false;
                        this.Mesg=response.error['Error Description'];
                        this.responseSuccess = false;
                      }
                  } else {
                      this.showLoader = false;
                      this.responseSuccess = true;
                      this.Mesg = response.data['Success Description'];
                  }

              },
                  error => {

              },
              () => {

              }
          );

      }


  }




  

  loginErrorMesg:string = '';

 

 
 
  scrollToTop() {
      this._utils.scrollToY(0,400,'easeInOutQuint');
    }


 
  recaptchaStatus:boolean = false;
  captchaResponse:any;
  



  
 


  ngOnInit() {
    this.scrollToTop();
    this.forgotPasswordFormInitialize();

    var seed = this;
    setTimeout(()=>{
    grecaptcha.render('html_element', {
        'sitekey' : '6LfPeVQUAAAAADV8drwrsUZfiWzj0B4VV6BZ18oc',
        'callback' : function(res)  {
            if(res != '') {
             seed.forgotPasswordForm.get('captchField').setValue('checked');
            }
         }

    });
},200)

    this.captchaResponse = grecaptcha.getResponse();
    if(this.captchaResponse.length != 0){
        this.recaptchaStatus = true;
    }
    else{
        this.recaptchaStatus = false;
    }

    
  
}

}




