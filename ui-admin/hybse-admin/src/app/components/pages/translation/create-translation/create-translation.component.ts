import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { MatDialog } from '@angular/material';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { ActivatedRoute, Router } from '@angular/router';
import { BlurInputErrorMatcher } from '../../../../modules/material/material.errror';

@Component({
  selector: 'hybse-admin-create-translation',
  templateUrl: './create-translation.component.html',
  styleUrls: ['./create-translation.component.css']
})
export class CreateTranslationComponent implements OnInit {

  
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
  createTranslationForm:FormGroup;
  formResponseMsg:string = '';
  alertStatusMessage:boolean;
  updateMenuName:boolean = false;
  @Input() actionType:string = 'add';
  TranslationID:any = 0;
  sectionTitle:string = 'Create Translation';
  


  cancelTranslationCreate() {
    this.updateMenuName = false;
  }
  createUpdateTranslation(form) {
    if( this.createTranslationForm.valid ) {
      let formVal = this.createTranslationForm.value;
      this.addUpdateTranslation(formVal,form);
    }
  }
  addUpdateTranslation(val,form) {
    let data:any = {
      idLocale: val.idLocale,
      sourceText: val.sourceText,
      translationText: val.translationText
    };
    let url = this._urls.createTranslationUrl;
    if(this.actionType == 'edit') {
      data.id = this.TranslationID;
      url = this._urls.updateTranslationUrl;
    }
    
    this._req.fetchApiData(url,data).subscribe(
      (data:any) => {
        let resSucc = data.data;
        let resErr = data.error;
        console.log(resSucc);
        setTimeout(()=>{
          this.routeToPage();
        },2000);

        // this.createTranslationForm.patchValue({
        //   'Translation_name': data.Translation_name,
        //   'Translation_name': data.Translation_name
        // });
        if(resSucc != '') {
          this.formResponseMsg = (this.addUpdateTranslation) ? 'Translation has been Successfully Updated' : 'Translation has been Successfully Created';
          this.alertStatusMessage = true;
          this.addUpdateNewTranslation(resSucc[0]);
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
  addUpdateNewTranslation(data) {
    if(this.updateMenuName) {
      this.allMenuList.forEach(ele => {
        if(data.id == ele.id) ele.menuName = data.menuName;
      });
    } else {
      this.allMenuList.push(data);
    }
  }

  getTranslationbyId(id) {
    let data = {
      id: id
    }
    this._req.fetchApiData(this._urls.getTranslationByIdUrl,data).subscribe(
      (data:any) => {
        console.log('Id',data);
        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') this.setFormData(resSucc[0]);
      }
    )
  }
  setFormData(data) {
    this.createTranslationForm.patchValue({
      'idLocale': data.idLocale,
      'sourceText': data.sourceText,
      'translationText': data.translationText
    });
  }



  routeToPage() {
   this.router.navigate(['/Translation/list']) 
  }
  ngOnInit() {
   // this.getAllMenuList();
  }


  ngOnChanges() {
    if(this.actionType == 'edit') {
      this.route.params.subscribe(
        data => {
          this.TranslationID = data.id;
          this.sectionTitle = 'Update Translation';
          this.getTranslationbyId(this.TranslationID);
        }
      )
    }
    
  }
}
