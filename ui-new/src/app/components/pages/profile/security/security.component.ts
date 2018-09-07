import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl ,AbstractControl } from '@angular/forms';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { StorageService } from '../../../../services/localstorage/storage.service';
import { ApirequestService } from './../../../../services/apirequest/apirequest.service';


declare var $:any;

@Component({
  selector: 'hybse-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})


export class SecurityComponent implements OnInit {

  constructor(private _utils: UtilityService, private _fb:FormBuilder,private _lstore: StorageService,  public _urls:ApiurlsService,public _req: ApirequestService) {}
  
  updatePasswordForm:FormGroup;
  updateEmailForm:FormGroup;
  
  updatePasswordFormInit(){
    {
      this.updatePasswordForm = this._fb.group({
              'oldPassword':  ['', [Validators.required]],
              'password':  ['', [Validators.required,this.validatePassword]],
              'confirmpassword':  ['', [Validators.required,this.validatePassword]],
          },
          { updateOn: 'blur', validator: [this.checkPassword,this.checkSamePassword]  }
      );
  }
  }

  updateEmailFormInit(){
    {
      this.updateEmailForm = this._fb.group({
              'oldEmail':  ['', [Validators.required,this.validateEmail]],
              'password':  ['', [Validators.required,this.validatePassword]],
              'newEmail':  ['', [Validators.required,this.validateEmail]],
          },
          { updateOn: 'blur',validator: [this.checkSameEmail] }
      );
  }
  }

userData:any;

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

checkSamePassword(control:AbstractControl) {
    let oldPassword = control.get('oldPassword').value;
    let password = control.get('password').value;

    if( (oldPassword == password) && password != '' ) {
        return { passwordSame : true }
    } else {
        return null;
    }
}

checkSameEmail(control:AbstractControl) {
    let oldEmail = control.get('oldEmail').value;
    let newEmail = control.get('newEmail').value;

    if( (oldEmail == newEmail) && newEmail != '' ) {
        return { EmailSame : true }
    } else {
        return null;
    }
}




Mesg:string = '';
updatePasswordFormValidate:boolean=false;
responseSuccess:boolean = false;
disableButton:boolean = false;
showLoader:boolean = false;

secondaryMesg:string = '';
updateEmailFormValidate:boolean=false;
secondaryresponseSuccess:boolean = false;
secondarydisableButton:boolean = false;
secondaryshowLoader:boolean = false;

updatePasswordFormSubmit(){
    let formVal = this.updatePasswordForm.value;
    this.updatePasswordFormValidate=true;
    if(this.updatePasswordForm.valid){
        this.Mesg='';
            this.showLoader = true;
            this.disableButton = true;
            let data = {
                oldPassword:formVal.oldPassword,
                newPassword: formVal.password,
                idUser: this.userData.id
            };
            this._req.fetchApiData(this._urls.updatePasswordUrl,data).subscribe(
                (data:any) => {
                  // console.log('all',data);
                  let response = data;
                  if(response.data == '') {
                    if( response.error != '' ){
                      this.showLoader = false;
                      this.disableButton = false;
                      this.Mesg=response.error['Error Description'];
                      this.responseSuccess = false;
                    }
                }
                else{
                    this.showLoader = false;
                    this.responseSuccess = true;
                    this.Mesg=response.data['Success Description'];

                }
                },
                error => {
          
                },
                () => {
          
                }
            )


    }
}

updateEmailFormSubmit(){
    let formVal = this.updateEmailForm.value;
    this.updateEmailFormValidate=true;
    if(this.updateEmailForm.valid){
        this.secondaryMesg='';
            this.secondaryshowLoader = true;
            this.secondarydisableButton = true;
            let data = {
                oldEmail:formVal.oldEmail,
                newEmail: formVal.newEmail,
                password: formVal.password,
                idUser: this.userData.id
            };
            this._req.fetchApiData(this._urls.updateEmailUrl,data).subscribe(
                (data:any) => {
                  // console.log('all',data);
                  let response = data;
                  if(response.data == '') {
                    if( response.error != '' ){
                      this.secondaryshowLoader = false;
                      this.secondarydisableButton = false;
                      this.secondaryMesg=response.error['Error Description'];
                      this.secondaryresponseSuccess = false;
                    }
                }
                else{
                    this.secondaryshowLoader = false;
                    this.secondaryresponseSuccess = true;
                    this.secondaryMesg=response.data['Success Description'];

                }
                },
                error => {
          
                },
                () => {
          
                }
            )


    }
}


setUpgradeFormVal(){
    let lsVal:any = this._lstore.getLocalItems('userData');
    lsVal == null ? ( lsVal = '') : (lsVal = JSON.parse(lsVal));
    this.userData = lsVal;
    // console.log('lsVal',lsVal);
    this.updatePasswordForm.patchValue({
    idUser: lsVal.id
    })
}



scrollToTop() {
    this._utils.scrollToY(0,400,'easeInOutQuint');
  }

  ngOnInit() {
    this.scrollToTop();
   this.updatePasswordFormInit();
   this.updateEmailFormInit();
   this.setUpgradeFormVal();

  }

}
