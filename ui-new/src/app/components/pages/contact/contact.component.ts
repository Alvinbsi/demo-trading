import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../services/utilities/utilities.services';
import { FormGroup, FormArray,FormControl, FormBuilder, Validators } from '@angular/forms';

declare var grecaptcha:any;
declare var $:any;





@Component({
  selector: 'hybse-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public _utils:UtilityService,private _fb: FormBuilder) { }

  recaptchaStatus:boolean = false;
  captchaResponse:any;

  contactForm:FormGroup;

  contactFormInitialize(){
    this.contactForm = this._fb.group({
      // 'captchField': ['', [Validators.required]]

  },
      {updateOn: 'blur'}
  );
  }

  scrollToTop() {
    this._utils.scrollToY(0,400,'easeInOutQuint');
  }

  
  ngOnInit() {
    this.scrollToTop();
    this.contactFormInitialize();
    var seed = this;
    setTimeout(()=>{
      grecaptcha.render('contact_element', {
          'sitekey' : '6LfPeVQUAAAAADV8drwrsUZfiWzj0B4VV6BZ18oc',
          'callback' : function(res)  {
              if(res != '') {
              //  seed.loginForm.get('captchField').setValue('checked');
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
