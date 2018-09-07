import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../services/utilities/utilities.services';
import { FormGroup, FormArray,FormControl, FormBuilder, Validators } from '@angular/forms';

declare var grecaptcha:any;
declare var $:any;


@Component({
  selector: 'hybse-press-center',
  templateUrl: './press-center.component.html',
  styleUrls: ['./press-center.component.css']
})
export class PressCenterComponent implements OnInit {

  constructor( private _utils: UtilityService , private _fb: FormBuilder) { }

  contactTeamForm:FormGroup;

  contactTeamFormInitialize() {
    this.contactTeamForm = this._fb.group({
       
         'captchField': ['', [Validators.required]]

    },
        {updateOn: 'blur'}
    );
}


  scrollToTop() {
    this._utils.scrollToY(0,400,'easeInOutQuint');
  }

  recaptchaStatus:boolean = false;
  captchaResponse:any;
  
  ngOnInit() {
    this.scrollToTop();

    var seed = this;
    setTimeout(()=>{
    grecaptcha.render('contact_element', {
        'sitekey' : '6LfPeVQUAAAAADV8drwrsUZfiWzj0B4VV6BZ18oc',
        'callback' : function(res)  {
            if(res != '') {
             seed.contactTeamForm.get('captchField').setValue('checked');
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
