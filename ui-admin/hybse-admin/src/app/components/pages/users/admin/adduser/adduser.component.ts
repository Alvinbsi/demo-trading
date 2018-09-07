import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'ng-animate';
import { FormBuilder, NgForm, FormGroup, Validators,FormControl, AbstractControl } from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import { ApirequestService } from '../../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../../services/api-urls/apiurls.service';
import { UtilityService } from '../../../../../services/utilities/utilities.services';
import { BlurInputErrorMatcher } from '../../../../../modules/material/material.errror';




@Component({
  selector: 'hybse-admin-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation( fadeInDown,{
      params: {
        timing: 1,
        a: '-10px'
      }
    }))])
  ],
})
export class AdduserComponent implements OnInit {

  constructor( private _fb:FormBuilder,
               private _req: ApirequestService,
               private _urls: ApiurlsService,
               private _utils: UtilityService,
               private route: ActivatedRoute,
               private router: Router ) { }
  fadeInDown:any;
  createUserForm:FormGroup;
  @Input() actionType:string = 'add';
  @Input() userType:string = 'Admin';
  blurMatcher = new BlurInputErrorMatcher();


  formTitle:string = 'Add New User';
  formResponseMsg:string = '';
  alertStatusMessage:boolean;
  showLoader:boolean = false;
  formSubmitted:boolean = false;
  userId:any;
  userName:string = '';


  getActionType() {
    if(this.actionType == 'edit') {
      this.formTitle = 'Edit User';
      this.showLoader = true;
    }
  }

  getuserType() {

  }




  getUserData() {
    if(this.userId != 'undefined') {
      let data = { data: { idUser: this.userId } };
      console.log(data);
      this._req.fetchApiData(this._urls.getUserDataUrl,data).subscribe(
        (data:any) => {
          console.log('GetData',data);
          this.setUserData(data.data);
        }
      )
    }
  }
  setUserData(data) {
    if( data != "" || data != "undefined" ) {
      // this.createUserForm.controls['uname'].setValue(data.Username);
      this.userName = data.username;
      this.createUserForm.controls['upass'].setValue('');
      this.createUserForm.controls['confirmpass'].setValue('');
      this.createUserForm.controls['userrole'].setValue(data.userType);
      this.createUserForm.controls['useremail'].setValue(data.email);
      this.createUserForm.controls['firstname'].setValue(data.firstName);
      this.createUserForm.controls['lastname'].setValue(data.lastName);
      this.createUserForm.controls['usergender'].setValue(data.gender);
      //this.createUserForm.controls['usergender'].setValue('Male');
      this.createUserForm.controls['userenabled'].setValue(data.isActive ? '1' : '0' );
      this.showLoader = false;
    }
  }

  createUserFormInit() {
    this.createUserForm = this._fb.group({
        //'uname': ['', [Validators.required]],
        'upass': ['', this.actionType == 'add' ? [Validators.required] : [] ],
        'confirmpass': ['', [this.confirmPasswordCheck.bind(this,0)]],
        'userrole': [(this.userType == 'Investor') ? this.userType : '', [Validators.required]],
        'useremail': ['', [ Validators.required,this.validateEmail ]],
        'firstname': ['', []],
        'lastname': ['', []],
        'usergender': ['',[Validators.required]],
        'userenabled': ['', [Validators.required]]
      },
      { updateOn:'submit', validator: this.checkConfirmPassword }
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

  confirmPasswordCheck(i:any, input:any) {
    if (typeof this.createUserForm != 'undefined') {
        let password = this.createUserForm.controls['upass'].value;
        let confirmPass = this.createUserForm.controls['confirmpass'].value;
        if( (password != confirmPass) && (confirmPass != '') ) {
          return { pwInvalid: true };
        } else {
          return null;
        }
    }
    return null;
  }

  checkConfirmPassword(control:AbstractControl) {
    let password = control.get('upass').value;
    let confirmPassword = control.get('confirmpass').value;
    if( (password != confirmPassword) && password != '' ) {
      return {
        passwordInvalid: true
      }
    }
    return null;
  }

  createUpdateUser() {
    let formVal = this.createUserForm.value;
    this.formSubmitted = true;
    let seed = this;
    if(this.createUserForm.valid) {
      this.showLoader = true;
      let data:any = {
        data: {
          firstName: formVal.firstname,
          lastName: formVal.lastname,
          email: formVal.useremail,
          password: formVal.upass,
          avatar: '',
          gender: formVal.usergender,
          isActive: formVal.userenabled
        }
      };

      let url = (this.userType == 'Admin' ) ? this._urls.createUserAdminUrl : this._urls.createUserInvestorUrl;
      //(this.userType == 'Admin' ) ? data.userType = formVal.userrole : data.userType = this.userType;
      if ( this.actionType == 'edit' ) {
        //data.idUser = this.userId;
        data.data.idUser = this.userId;
        //url = this._urls.updateUserUrl;
        url = (this.userType == 'Admin' ) ? this._urls.updateAdminUrl : this._urls.updateUserUrl;
      }
      this._req.fetchApiData(url,data).subscribe(
        (data:any) => {
          let response = data.data;
          let responseErr = data.error;
          this.showLoader = false;
          this.formSubmitted = false;
          this._utils.scrollToY(0,400,'easeInOutQuint');
          if(response != '') {
            this.formResponseMsg = (this.actionType == 'edit' ) ? 'User has been updated Successfully' : 'User has been created Successfully';
            this.alertStatusMessage = true;
            setTimeout(()=>{
              this.routeToPage();
            },2000);
          }
          if(responseErr != '') {
            this.formResponseMsg = responseErr['Error Msg'];
            this.alertStatusMessage = false;
          }
        },
        error => {

        },
        () => {

        }
      );

    }
  }

  cancelUserCreate() {
    this.routeToPage();
  }
  routeToPage() {
    (this.userType == 'Admin' ) ? this.router.navigate(['/admin/user-lists']) : this.router.navigate(['/investor/user-lists']);
  }



  ngOnInit() {
    this.createUserFormInit();
    this.route.params.subscribe(
      params => {
        this.userId = params.id;
        this.getUserData();
      }
    )
  }

  ngOnChanges() {
    this.getActionType();
    this.getuserType();
  }
}
