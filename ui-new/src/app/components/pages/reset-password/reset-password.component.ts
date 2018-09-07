import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormArray,FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
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
  selector: 'hybse-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
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
    private _urls:ApiurlsService,
    private route:ActivatedRoute
  ) {

     

  }


  resetPasswordForm:FormGroup;
  resetPasswordFormValidate:boolean = false;
  disableButton:boolean = false;
  

  resetPasswordFormInitialize() {
      this.resetPasswordForm = this._fb.group({
             'password':  ['', [Validators.required,this.validatePassword]],
             'confirmpassword':  ['', [Validators.required,this.validatePassword]],
          'captchField': ['', [Validators.required]]

      },
      { updateOn: 'blur', validator: [this.checkPassword] }
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

  validatePassword(input:FormControl) {
    let val = input.value;
    let regex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!regex.test(val) && val != '' )  {
        return {
            passwordInvalid: true
        }
    }
    return null;
}



checkPassword(control:AbstractControl) {
    let pass = control.get('password').value;
    let confirmpassword = control.get('confirmpassword').value;

    if( (pass != confirmpassword) && confirmpassword != '' ) {
        return { passInvalid : true }
    } else {
        return null;
    }
}



  showLoader:boolean = false;

  resetPasswordFormSubmit() {

      this.Mesg="";
      let forgotPasswordData = this.resetPasswordForm.value;
      this.resetPasswordFormValidate = true;
      this.showLoader = true;
      if(this.resetPasswordForm.valid) {
          this.disableButton = true;
          let data = {
                         idUser: this.idUser,
                         activationKey : this.activationKey,
                         password: forgotPasswordData.password

                     };

                     this._req.fetchApiData(this._urls.resetPasswordUrl,data).subscribe(
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
  



  idUser:any;
  activationKey:any;

 resetPassword(resetData:any){
  this.idUser = resetData.idUser;
  this.activationKey = resetData.activationKey; 
 }


  ngOnInit() {

    this.route.queryParams.subscribe(
      params => {
          // console.log('Query',params);
          if( params.idUser,params.activationKey ) {
              this.resetPassword(params);
          }

      }
  )

    this.scrollToTop();
    this.resetPasswordFormInitialize();

    var seed = this;
    setTimeout(()=>{
    grecaptcha.render('html_element', {
        'sitekey' : '6LfPeVQUAAAAADV8drwrsUZfiWzj0B4VV6BZ18oc',
        'callback' : function(res)  {
            if(res != '') {
             seed.resetPasswordForm.get('captchField').setValue('checked');
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





 


