import { Component, OnInit, Input,EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl, AbstractControl,FormGroupDirective } from '@angular/forms';
import { ApirequestService } from '../../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../../services/api-urls/apiurls.service';

@Component({
  selector: 'hybse-admin-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor( private _fb: FormBuilder, private _req:ApirequestService, private _urls: ApiurlsService ) { }
  @Input() userDetails:any = '';
  @Output() formStatus:any = new EventEmitter();
  showLoader:boolean = false;


  userUpdateForm:FormGroup;

  userFormInit() {
    this.userUpdateForm = this._fb.group({
        'username': [''],
        'password': [''],
        'confirmPassword': [ '',[ this.confirmPasswordCheck.bind(this,0) ]],
        'useremail': ['',[this.validateEmail]],
        'firstName': [''],
        'lastName': [''],
        'usergender': ['Male'],
        'userenable': [1]
    });
  }
  updateUserData() {
    console.log(this.userUpdateForm.value);
    console.log(this.userUpdateForm.valid);
    this.showLoader = true;
    let formVal = this.userUpdateForm.value;
    let data = {
      avatar: '',
      email: formVal.useremail,
      firstName: formVal.firstName,
      gender: formVal.usergender,
      data: { idUser: this.userDetails.iduser },
      lastName: formVal.lastName,
      password: formVal.password,
      isActive: formVal.userenable == 1 ? true : false
    };

    this._req.fetchApiData(this._urls.updateInvestorUrl,data).subscribe(
      (data:any) => {
        console.log(data);
        let res = data.data;
        let resErr = data.error;
        this.showLoader = false;
        if(res != '') {
          this.formStatus.emit({
            status: true,
            message: 'User Account has been Successfully updated'
          });
        }
        if( resErr != '' ) {
          this.formStatus.emit({
            status: false,
            message: resErr['Error Description'] != '' ? resErr['Error Description'] : resErr['Error Msg']
          });
        }
      },
      error => {

      },
      () => {

      }
    )

  }


  validateEmail(input:AbstractControl) {
    let val = input.value;
    let regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!regex.test(val) && val != '' )  {
      return {
        emailInvalid: true
      }
    }
    return null;
  }

  // confirmPwRequired( i:any, input:any ) {
  //   if (typeof this.userUpdateForm != 'undefined') {
  //     let password = this.userUpdateForm.controls['password'].value;
  //     let confirmPass = this.userUpdateForm.controls['confirmPassword'].value;
  //     if( password != '') {
  //       if(confirmPass == '') {
  //         this.userUpdateForm.get('confirmPassword').setValidators([Validators.required]);
  //       } else {
  //         return null;
  //       }
  //     }
  //   }
  //   return null;
  // }

  confirmPasswordCheck(i:any, input:any) {
    if (typeof this.userUpdateForm != 'undefined') {
        let password = this.userUpdateForm.controls['password'].value;
        let confirmPass = this.userUpdateForm.controls['confirmPassword'].value;
        if(password != confirmPass ) {
          return { pwInvalid: true };
        } else {
          return null;
        }
    }
    return null;
  }

  setUserData(data) {
    // this.userUpdateForm.patchValue({
    //   'username': data.Username,
    //   'password': '',
    //   'confirmPassword': '',
    //   'useremail': data.Useremail,
    //   'firstName': data.firstName,
    //   'lastName': data.lastName,
    //   'usergender': data.gender
    // });

    this.userUpdateForm.patchValue({
      'username': data.Username,
      'password': '',
      'confirmPassword': '',
      'useremail': data.Useremail,
      'firstName': '',
      'lastName': '',
      'usergender': 'Male',
      'userenable': data.isActive
    });
  }

  ngOnInit() {
    this.userFormInit();
  }

  ngOnChanges() {
    if(this.userUpdateForm != undefined) this.setUserData(this.userDetails);
  }
}
