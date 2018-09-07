import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup,  FormGroupDirective, NgForm } from '@angular/forms';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { BlurInputErrorMatcher } from '../../../../modules/material/material.errror';
import { ConfirmdialogComponent } from '../../../common/dialog/confirmdialog.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hybse-admin-create-locale',
  templateUrl: './create-locale.component.html',
  styleUrls: ['./create-locale.component.css']
})
export class CreateLocaleComponent implements OnInit {

  constructor(private _fb:FormBuilder,
    private _req:ApirequestService,
    private _urls:ApiurlsService,
    private dialog: MatDialog,
    private _utils:UtilityService,
    public route : ActivatedRoute,
    private router: Router ) { }

  showLoader:boolean = false;
  showTableLoader:boolean = false;
  allMenuList:any = [];
  blurMatcher = new BlurInputErrorMatcher();
  createLocaleForm:FormGroup;
  formResponseMsg:string = '';
  alertStatusMessage:boolean;
  updateMenuName:boolean = false;
  @Input() actionType:string = 'add';
  localeID:any = 0;
  sectionTitle:string = 'Create Locale';
  

  createLocaleFormInit() {
    this.createLocaleForm = this._fb.group({
      'locale_name': ['',[Validators.required]],
      'language_name': ['',[Validators.required]],
      'currency_name': ['',[Validators.required]],
      'currency_symbol': ['',[Validators.required]],
      'symbol_position': ['',[Validators.required]],
      'number_format': ['',[Validators.required]],
    });
  }
  cancelLocaleCreate() {
    this.updateMenuName = false;
  }
  createUpdateLocale(form) {
    if( this.createLocaleForm.valid ) {
      let formVal = this.createLocaleForm.value;
      this.addUpdateLocale(formVal,form);
    }
  }
  addUpdateLocale(val,form) {
    let data:any = {
      localeName: val.locale_name,
      languageName: val.language_name,
      currencyName: val.currency_name,
      currencySymbol: val.currency_symbol,
      symbolPosition: val.symbol_position,
      numberFormat: val.number_format
    };
    let url = this._urls.createLocaleUrl;
    if(this.actionType == 'edit') {
      data.id = this.localeID;
      url = this._urls.updateLocaleUrl;
    }
    
    this._req.fetchApiData(url,data).subscribe(
      (data:any) => {
        let resSucc = data.data;
        let resErr = data.error;
        console.log(resSucc);
        setTimeout(()=>{
          this.routeToPage();
        },2000);

        // this.createLocaleForm.patchValue({
        //   'locale_name': data.locale_name,
        //   'locale_name': data.locale_name
        // });
        if(resSucc != '') {
          this.formResponseMsg = (this.addUpdateLocale) ? 'Locale has been Successfully Updated' : 'Locale has been Successfully Created';
          this.alertStatusMessage = true;
          this.addUpdateNewLocale(resSucc[0]);
        }

        if(resErr != '') {
          this.formResponseMsg = resErr['Error Msg'];
          this.alertStatusMessage = false;
        }

        this.updateMenuName = false;
      },
      error => {

      },
      () => {
        this.showTableLoader = false;
      }
    );
  }
  addUpdateNewLocale(data) {
    if(this.updateMenuName) {
      this.allMenuList.forEach(ele => {
        if(data.id == ele.id) ele.menuName = data.menuName;
      });
    } else {
      this.allMenuList.push(data);
    }
  }

  getLocalebyId(id) {
    let data = {
      id: id
    }
    this._req.fetchApiData(this._urls.getLocaleByIdUrl,data).subscribe(
      (data:any) => {
        console.log('Id',data);
        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') this.setFormData(resSucc[0]);
      }
    )
  }
  setFormData(data) {
    this.createLocaleForm.patchValue({
      'locale_name': data.localeName,
      'language_name': data.languageName,
      'currency_name': data.currencyName,
      'currency_symbol': data.currencySymbol,
      'symbol_position': data.symbolPosition,
      'number_format': data.numberFormat,
    });
  }



  routeToPage() {
   this.router.navigate(['/locale/view']) 
  }
  ngOnInit() {
    this.createLocaleFormInit();
   // this.getAllMenuList();
  }


  ngOnChanges() {
    if(this.actionType == 'edit') {
      this.route.params.subscribe(
        data => {
          this.localeID = data.id;
          this.sectionTitle = 'Update Locale';
          this.getLocalebyId(this.localeID);
        }
      )
    }
    
  }
}
