import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { MatDialog } from '@angular/material';
import { ConfirmdialogComponent } from '../../common/dialog/confirmdialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'hybse-admin-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {

  constructor( private route:Router,
               private _fb: FormBuilder,          
    private _req:ApirequestService,private _urls: ApiurlsService,private dialog: MatDialog,private _ar:ActivatedRoute ) { }
  
  createTranslationForm:FormGroup;
  updateTranslationList:boolean = false;
  formResponseMsg:any = "";
  alertStatusMessage:boolean = false;
  translateHeading:any ="ADD TRANSLATION";

  createTranslationFormInit() {
    this.createTranslationForm = this._fb.group({
      'idLocale': ['',[Validators.required]],
      'sourceText': ['',[Validators.required]],
      'translationText': ['',[Validators.required]]
    });
  }
  
  allTranslationList:any = [];
  localeList:any = [];
  translationID:any = 0;
  getTranslationList() {
    this._req.fetchApiData(this._urls.listTranslationUrl,{}).subscribe(
      (data:any) => {
        let response = data.data;
        if(response.length != 0 ) {
          this.allTranslationList = response;
          console.log( 'this.translationList', this.allTranslationList[0] );
        }
      },
      error => {
      },
      () => {
      }
    );
  }
  getLocaleList() {
    this._req.fetchApiData(this._urls.listLocaleUrl,{}).subscribe(
      (data:any) => {
        let response = data.data;
        if(response.length != 0 ) {
          this.localeList = response;
        }
      },
      error => {
      },
      () => {
      }
    );
  }
  confirmDelete(id,i?,si=0) {
    alert(id);
    const deleteDialog = this.dialog.open(ConfirmdialogComponent,{
      width: '400px',
      height: '170px',
      data: {
        message: 'Are you sure to delete this Translation?'
      }
    });

    deleteDialog.afterClosed().subscribe(
      data => {
        //console.log('Dialog data',data);
        if(data) this.deleteTranslation(id,i,si);
      }
    );
  }
  deleteTranslation(id,i,$i)
  {
    let data = { id: id };
    this._req.fetchApiData(this._urls.deleteTranslationUrl,data).subscribe(
      (data:any) => {
        console.log('UserList',data);
        let response = data;
        if(response != 0 ) this.getTranslationList();
      },
      error => {

      },
      () => {

      }
    );
  }
  cancelTranslationCreate()
  {
    this.translateHeading="ADD TRANSLATION";
  }

  createTranslation(form) {
    if(this.createTranslationForm.valid) {
      let formVal = this.createTranslationForm.value;
      let data:any = {
        idLocale: formVal.idLocale,
        sourceText: formVal.sourceText,
        translationText: formVal.translationText
      };
      let url = this._urls.createTranslationUrl;
      if(this.updateTranslationList) {
        data.id = this.translationID;
        url = this._urls.updateTranslationUrl;
      }
      
      this._req.fetchApiData(url,data).subscribe(
        (data:any) => {
          let resSucc = data.data;
          let resErr = data.error;
          console.log(resSucc);
          setTimeout(()=>{
          //  this.routeToPage();
          },2000);
  
          // this.createLocaleForm.patchValue({
          //   'locale_name': data.locale_name,
          //   'locale_name': data.locale_name
          // });
          if(resSucc != '') {
            this.getTranslationList();
            form.resetForm();
             this.formResponseMsg = (this.updateTranslationList) ? 'Translation has been Successfully Updated' : 'Translation has been Successfully Created';
             this.updateTranslationList = false;
             this.translateHeading="ADD TRANSLATION";
             this.translationID = 0;
             this.alertStatusMessage =true;
            // this.addUpdateNewLocale(resSucc[0]);
          }
  
          if(resErr != '') {
             this.formResponseMsg = resErr['Error Msg'];
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

  updateTranslation(data) {
    this.createTranslationForm.patchValue({
      'idLocale': data.idLocale.toString(),
      'sourceText': data.sourceText,
      'translationText': data.translationText
    });
    this.translateHeading = "EDIT TRANSLATION";
    this.formResponseMsg = "";
    this.updateTranslationList = true;
    this.translationID = data.id;
  }

  translationLocale(id) {
    this.route.navigate(['/translation/update', id]);
  }
  ngOnInit() {
    this.getTranslationList();
    this.getLocaleList();
    this.createTranslationFormInit();
  }

}
