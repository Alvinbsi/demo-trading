import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray,FormControl, FormBuilder, Validators ,AbstractControl} from '@angular/forms';
import { ViewChild,ElementRef,HostListener } from '@angular/core';
import { ApiDataServices } from '../../../services/apiservices/api.services';
import { UtilityService } from '../../../services/utilities/utilities.services';
import { IssuerregisterService } from '../../../services/registration/issuerregister.service';
import { FacebookService, InitParams,LoginResponse,LoginOptions } from 'ngx-facebook';
import { SocialRegisterationService } from '../../../services/social-register/social-registeration.service';
import { Router } from '@angular/router';
import { LinkedInService } from 'angular-linkedin-sdk';

declare var gapi:any;
declare var grecaptcha:any;
declare var $:any;

@Component({
  selector: 'hybse-issuer-register',
  templateUrl: './issuer-register.component.html',
  styleUrls: ['./issuer-register.component.css']
})
export class IssuerRegisterComponent implements OnInit {
    Mesg:string;

  constructor(public _fb:FormBuilder,
        public _rs:IssuerregisterService,
        public fbs:FacebookService,
        public _sr:SocialRegisterationService,
        public router:Router,
        public _utils:UtilityService,
        private _lInS: LinkedInService
     ) {
      let initParams: InitParams = {
          appId: '1505019676472820',
          xfbml: true,
          version: 'v2.12'
      };

      fbs.init(initParams);

  }
    RegisterForm:FormGroup;
    RegisterFormInit()
    {
        this.RegisterForm = this._fb.group({
            'firstName': ['', [Validators.required]],
            'lastName':  ['', [Validators.required]],
            'email':     ['', [Validators.required,this.validateEmail]],
            'password':  ['', [Validators.required,this.validatePassword]],
            'confirmpassword':  ['', [Validators.required,this.validatePassword]],
            'confirmbox':  [false, [Validators.requiredTrue]],
            'captchField': ['', [Validators.required]]


    },
            { updateOn: 'blur', validator: [this.checkPassword] }
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

    checkPassword(control:AbstractControl) {
        let pass = control.get('password').value;
        let confirmpassword = control.get('confirmpassword').value;

        if( (pass != confirmpassword) && confirmpassword != '' ) {
            return { passInvalid : true }
        } else {
            return null;
        }
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



    RegisterFormValidate:boolean=false;
    responseSuccess:boolean = false;
    disableButton:boolean = false;
    showLoader:boolean = false;
    RegisterFormSubmit() {
        let formVal = this.RegisterForm.value;
        this.RegisterFormValidate = true;
        if (this.RegisterForm.valid) {
           // this.Mesg = 'Check your mail for activation link';
           this.Mesg='';
           this.showLoader = true;
           this.disableButton = true;

            let data = {
                firstName: formVal.firstName,
                lastName: formVal.lastName,
                email: formVal.email,
                password: formVal.password
            };


            this._rs.registerUser(data).subscribe(
                (result:any) => {
                    // console.log('registerUser', result);
                    let res = result.data;
                    let resErr = result.error;
                    this.disableButton = false;
                    this.showLoader = false;
                    if(res != '') {
                        this.Mesg = 'Check your mail for activation link';
                        this.responseSuccess = true;
                        this. RegisterForm.reset();
                    }
                    if(resErr != '') {
                        this.Mesg = resErr['Error Description'];
                        this.responseSuccess = false;
                    }
                },
                    error => {

                },
                () => {

                }
            );

            //}
        }
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
                // console.error(error)
            });
    }


    loginErrorMsg:string = '';

    getUserInfo() {

        this.fbs.api('/me?fields=id,name,email')
            .then((res: any) => {
                // console.log('Res', res);
                let data = {
                    email: res.email,
                    fbId: res.id,
                    userType: 'Issuer',
                    social: "fb"
                };

                this._sr.socialRegister(data).subscribe(
                    (data:any)=>{
                        // console.log('res',data);

                        let res = data.data;
                        let resErr = data.error;
                        let newReg = res.newReg;
                        if( newReg == '1' ) {
                          this.router.navigate(['/issuerRegister/'+ res.idUser ]);
                        }
                        if ( newReg == '0'){
                            this.router.navigate(['/companylist']);
                        }

                        if( resErr != '') {
                            this.handleSocialLogin('Facebook',resErr);

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
        let seed = this;
        this.Mesg="";
        this.showLoader = true;
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
                userType: 'Issuer',
                social: "google"
            };

            seed._sr.socialRegister(data).subscribe(
                (data:any)=>{
                    // console.log('res',data);
                    let res = data.data;
                    let resErr = data.error;
                    let newReg = res.newReg;
                    if( newReg == '1' ) {
                      seed.router.navigate(['/issuerRegister/'+ res.idUser ]);
                    }
                    if ( newReg == '0'){
                        seed.router.navigate(['/companylist']);
                    }

                    if( resErr != '') {
                        seed.handleSocialLogin('Google',resErr);

                    }
                },
                    error => {

                },
                () => {

                }
            );



        });
    }


    loginWithlinkedIn(){
        this.Mesg="";
        this.showLoader = true;
        this._lInS.login().subscribe({
            next: (state) => {

              const url = '/people/~:(id,firstName,lastName,email-address)?format=json';


                this._lInS.raw(url).asObservable().subscribe({
                    next: (data:any) => {
                        // console.log(data.emailAddress);
                        // console.log(data.firstName);
                        // console.log(data.id);
                        // console.log(data.lastName);
                        let linkedData = {
                            email: data.emailAddress,
                            linkedinId: data.id,
                            social: "linkedin",
                            userType: 'Issuer'
                        };

                        this._sr.socialRegister(linkedData).subscribe(
                            (data:any)=>{
                                // console.log('res',data);
                                let res = data.data;
                                let resErr = data.error;
                                let newReg = res.newReg;
                        if( newReg == '1' ) {
                          this.router.navigate(['/issuerRegister/'+ res.idUser ]);
                        }
                        if ( newReg == '0'){
                            this.router.navigate(['/companylist']);
                        }

                        if( resErr != '') {
                            this.handleSocialLogin('Linkedin',resErr);

                        }
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



    loginWithOutlook(){
        alert('on Construction');
    }



    handleSocialLogin(type,data) {
      if(data.source == type) {
        this.router.navigate(['/companylist']);
      } else {

        this.responseSuccess = false;
        this.showLoader = false;
        this.Mesg = data['Error Description'];
      }
    }
    scrollToTop() {
      this._utils.scrollToY(0,400,'easeInOutQuint');
    }
    recaptchaStatus:boolean = false;
    captchaResponse:any;
    ngOnInit() {
        this.RegisterFormInit();
        this.googleInit();
        this.scrollToTop();
        $('#password').tooltip({'trigger':'focus', 'title': 'Password must have a Upper case and a special Character with length of 8 to 18 characters'});
        $('#confirmpassword').tooltip({'trigger':'focus', 'title': 'Please Re-Enter the same password'});

        var seed = this;
        setTimeout(()=>{
        grecaptcha.render('html_element', {
            'sitekey' : '6LfPeVQUAAAAADV8drwrsUZfiWzj0B4VV6BZ18oc',
            'callback' : function(res)  {
                if(res != '') {
                 seed.RegisterForm.get('captchField').setValue('checked');
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
