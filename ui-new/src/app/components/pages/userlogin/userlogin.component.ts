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
import { ApirequestService } from './../../../services/apirequest/apirequest.service';


declare var gapi:any;
declare var grecaptcha:any;
declare var $:any;


@Component({
  selector: 'hybse-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

    title = 'hybse';
    Mesg:string = '';
    Authenticate:boolean;
    UserId:string;
    FirstName:string;
    LastName:string;
    newReg:string;
    redirectId:string;
    storageKey = { user: 'user',Username: 'Username' , Email: 'Email' ,userType: 'userType', userData:'userData', isLogin:'isLogin' }

    modalPopUpToggle:boolean = false;
    modalAnimateClass = "slideInDown";
    
    
    constructor(private _fb: FormBuilder,
      private router:Router,
      private _ls:UserloginService,
      public fbs:FacebookService,
      public _sr:SocialRegisterationService,
      private _lInS: LinkedInService,
      public _utils:UtilityService,
      private _lstore: StorageService,
      public _req: ApirequestService,
      public _urls:ApiurlsService
    ) {

        let initParams: InitParams = {
            appId: '1505019676472820',
            xfbml: true,
            version: 'v2.12'
        };

        fbs.init(initParams);

    }


    loginForm:FormGroup;
    loginFormValidate:boolean = false;
    disableButton:boolean = false;
    

    loginFormInitialize() {
        this.loginForm = this._fb.group({
            'email': ['',[Validators.required,this.validateEmail]],
            'password': ['',[Validators.required]],
            // 'captchField': ['', [Validators.required]]

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
    errorMessage:any;
    dataidUser:any;

    loginFormSubmit() {

        this.Mesg="";
        let loginData = this.loginForm.value;
        this.loginFormValidate = true;
        this.showLoader = true;
        if(this.loginForm.valid) {
            this.disableButton = true;
            let data = {
                email: loginData.email,
                password: loginData.password
                       };

            this._ls.registerUser(data).subscribe(
                (data:any) => {
                    // console.log('data',data);
                    let response = data;
                    // console.log('Response Data',response.data);
                    if(response.data == '') {
                        if( response.error != '' ){
                          this.errorMessage = response.error['Error Msg'];
                          if(this.errorMessage == 'Already logged in' ){
                            this.showLoader = false;
                            this.disableButton = false;
                            this.responseSuccess = false;
                            this.modalPopUpToggle = true;
                            this.dataidUser = response.error.idUser;

                          }
                          else{

                            this.showLoader = false;
                            this.disableButton = false;
                            this.Mesg=response.error['Error Description'];
                            this.responseSuccess = false;
                          }
                          
                        }
                    } else {
                        this.showLoader = false;
                        this.responseSuccess = true;
                        this.Mesg='Login Success';
                        this.Authenticate=true;
                        this.UserId= response.data.username;
                        this.FirstName=response.data.Firstname;
                        this.LastName=response.data.Lastname;
                        this.newReg=response.data.newReg;
                
                        this.redirectId = response.data.idUser;
                        let userData = { id: response.data.idUser, Username: response.data.username, Email: response.data.Email, sessionKey:  response.data.Key.sessionKey, publicKey:  response.data.Key.publicKey };
                        this._lstore.setLocalItem( this.storageKey.userData, userData );
                        this._lstore.setLocalItem(this.storageKey.user, response.data.idUser);
                        this._lstore.setLocalItem(this.storageKey.userType, response.data.userType);
                        this._lstore.setLocalItem(this.storageKey.isLogin, response.data.isLogin);
                        
                        let userType = this._lstore.getLocalItems(this.storageKey.userType);
                        this._lstore.storageVal.next(userType);
                        this._ls.userLoginStatus = true;
                        if(this.newReg == '1'){
                            this.router.navigate(['/issuerRegister/'+this.redirectId]);
                        } else{
                          this.router.navigate(['/companylist']);
                        }
                    }

                },
                    error => {

                },
                () => {

                }
            );

        }


    }

    modalClose() {
        //this.modalAnimateClass = this.modalPopUpToggle ? 'slideInDown' : 'modalSlideUp';
        this.modalAnimateClass = 'modalSlideUp';
        setTimeout(()=> {
          this.modalPopUpToggle = false;
          this.modalAnimateClass = 'slideInDown';
        }, 300 );
    
      }
sessionEndshowLoader:boolean = false;
      endSession(){
        this.Mesg="";
        this.sessionEndshowLoader = true;
        let data = {
                    idUser: this.dataidUser
        };
        this._req.fetchApiData(this._urls.logoutPreviousSessionUrl,data).subscribe(
            (data:any) => {
                // console.log(data);
                let resSucc = data.data;
                let resErr = data.error;
               
                if( resSucc != '' ) {
                   
                    this.sessionEndshowLoader = false;
                    this.modalClose(); 
                    this.responseSuccess = true;
                    this.Mesg = "All users logged out successfully.Please Login Again";
                }
                else{
                    this.sessionEndshowLoader = false;
                    this.modalClose(); 
                    this.responseSuccess = false;
                    this.Mesg = resErr['Error Description'];
                }
                
        
            },
            error => {
        
            },
            () => {
        
            }
        )
        
        
        }



    loginWithFacebook() {
        this.Mesg="";
        this.showLoader = true;
        const loginOptions: LoginOptions = {
            enable_profile_selector: true,
            return_scopes: true,
            scope: 'email'
        };
        this.fbs.login(loginOptions)
            .then((response: LoginResponse) =>
            {
                this.getUserInfo();
            }).catch((error: any) => {
                console.error(error)
            });
    }


    loginErrorMesg:string = '';

    getUserInfo() {
        this.fbs.api('/me?fields=id,name,email')
            .then((res: any) => {
                // console.log('Res', res);
                let data = {
                    email: res.email,
                    fbId: res.id,
                    social: "fb",
                    userType: 'Investor'
                };

                this._sr.socialRegister(data).subscribe(
                    (data:any)=>{
                        // console.log('res',data);
                        let res = data.data;
                        let resErr = data.error;
                        this.handleSocialLogin('Facebook',resErr);
                        if(res != '') {
                          this._lstore.setLocalItem(this.storageKey.userType, res.userType);
                          this._lstore.setLocalItem(this.storageKey.user, res.idUser);
                          let userType = this._lstore.getLocalItems(this.storageKey.userType);
                          this._lstore.storageVal.next(userType);
                          this.router.navigate(['/companylist']);
                        }
                    },
                        error => {

                    },
                    () => {

                    }
                );

            })
            .catch();
    }

    googleAuthenticate:any;
    public googleInit() {
        let that = this;
        gapi.load('auth2', function () {
            that.googleAuthenticate = gapi.auth2.init({
                client_id: '225278660510-l8m9va6j6o1icvpo56g3g94bg7h9jopi.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });
        });
    }


    loginWithGoogle(){
        this.Mesg="";
        this.showLoader = true;
        let seed = this;
        this.googleAuthenticate.signIn().then(function(res){
            let profile = seed.googleAuthenticate.currentUser.get().getBasicProfile();
            let token = seed.googleAuthenticate.currentUser.get().getAuthResponse(true).access_token;
            let backendToken = seed.googleAuthenticate.currentUser.get().getAuthResponse(true).id_token;
            // console.log(profile.getId());
            // console.log(profile.getName());
            // console.log(profile.getEmail());
            // console.log(profile.getImageUrl());
            // console.log(token);
            // console.log(backendToken);

            let data = {
                email: profile.getEmail(),
                googleId: profile.getId(),
                social: "google",
                userType: 'Investor'
            };

            seed._sr.socialRegister(data).subscribe(
                (data:any)=>{
                    // console.log('res',data);
                    let res = data.data;
                    let resErr = data.error;
                    //seed.router.navigate(['/userlanding']);
                    //seed.handleSocialLogin()
                    if(res != '')  {
                        seed._lstore.setLocalItem(seed.storageKey.userType, res.userType);
                        seed._lstore.setLocalItem(seed.storageKey.user, res.idUser);
                      let userType = seed._lstore.getLocalItems(seed.storageKey.userType);
                      seed._lstore.storageVal.next(userType);
                      seed.router.navigate(['/companylist']);
                    }
                    seed.handleSocialLogin('Google',resErr);
                },
                    error => {

                },
                () => {

                }
            );



        });
    }


    loginWithlinkedIn(){
        this.showLoader = true;
        this.Mesg="";
        this._lInS.login().subscribe({
            next: (state) => {

              const url = '/people/~:(id,firstName,lastName,email-address)?format=json';


                this._lInS.raw(url).asObservable().subscribe({
                    next: (data:any) => {

                        let linkedData = {
                            email: data.emailAddress,
                            linkedinId: data.id,
                            social: "linkedin",
                            userType: 'Investor'
                        };

                        this._sr.socialRegister(linkedData).subscribe(
                            (data:any)=>{
                                // console.log('res',data);
                                let res = data.data;
                                let resErr = data.error;
                                if(res != '') {
                                  this._lstore.setLocalItem(this.storageKey.userType, res.userType);
                                  let userType = this._lstore.getLocalItems(this.storageKey.userType);
                                  this._lstore.storageVal.next(userType);
                                  this._lstore.setLocalItem(this.storageKey.user, res.idUser);
                                  this.router.navigate(['/companylist']);
                                }
                                //seed.router.navigate(['/userlanding']);
                                //seed.handleSocialLogin()
                                //seed.router.navigate(['/userlanding']);
                               this.handleSocialLogin('LinkedIn',resErr);
                            },
                                error => {

                            },
                            () => {

                            }
                        );
                    },
                    error: (err) => {
                        // console.log(err);
                    },
                    complete: () => {
                    }
                });

            },
            complete: () => {
              // Completed
            }
          });
    }

    scrollToTop() {
        this._utils.scrollToY(0,400,'easeInOutQuint');
      }


    handleSocialLogin(type,data) {
      if(data.source == type) {
        this.router.navigate(['/companylist']);
      } else {
        // alert(data['Error Description']);
        this.showLoader = false;
        this.responseSuccess = false;
        this.Mesg = data['Error Description'];
      }
    }

    recaptchaStatus:boolean = false;
    captchaResponse:any;
    


 
    
   


    ngOnInit() {
        localStorage.clear();
      this.Authenticate = false;
      this.scrollToTop();
      this.loginFormInitialize();
      this.googleInit();

      var seed = this;
      setTimeout(()=>{
      grecaptcha.render('html_element', {
          'sitekey' : '6LfPeVQUAAAAADV8drwrsUZfiWzj0B4VV6BZ18oc',
          'callback' : function(res)  {
              if(res != '') {
               seed.loginForm.get('captchField').setValue('checked');
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




