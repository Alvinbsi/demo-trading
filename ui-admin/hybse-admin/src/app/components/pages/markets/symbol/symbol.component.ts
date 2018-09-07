import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlurInputErrorMatcher } from '../../../../modules/material/material.errror';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { ConfirmdialogComponent } from '../../../common/dialog/confirmdialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'hybse-admin-symbol',
  templateUrl: './symbol.component.html',
  styleUrls: ['./symbol.component.css']
})
export class SymbolComponent implements OnInit {

  constructor(private _fb:FormBuilder,
    private _api: ApirequestService,
    private _utils: UtilityService,
    private dialog: MatDialog,
    private _urls: ApiurlsService ) { }
  createSymbolForm:FormGroup;
  blurMatcher = new BlurInputErrorMatcher();
  symbolList:any = [];
  updateSymbolVal:boolean = false;
  showLoader:boolean = true;
  formResponseMsg:any = '';
  alertStatusMessage:boolean;
  createSymbolFormInit() {
    this.createSymbolForm = this._fb.group({
      'asset_name': ['',[Validators.required]],
      'symbol_name': ['',[Validators.required, Validators.maxLength(4)]],
      'symbol_id': ['']
    });
  }


  createUpdateSymbols(form) {
    if(this.createSymbolForm.valid) {
      let formVal = this.createSymbolForm.value;
      let data:any = {
        assetName: formVal.asset_name,
        symbol: formVal.symbol_name
      };
      let url = this._urls.createSymbolUrl;
      if(this.updateSymbolVal) {
        url = this._urls.updateSymbolUrl;
        data.id = formVal.symbol_id;
      }
      console.log(data);
      this._api.fetchApiData(url,data).subscribe(
        (data:any) => {
          let resSucc = data.data;
          let resErr = data.error;
          if(resSucc != '') {
            this.formResponseMsg = (this.updateSymbolVal ) ? 'Symbol has been updated Successfully' : 'Symbol has been created Successfully';
            this.alertStatusMessage = true;
          }
          if(resErr != '') {
            this.formResponseMsg = resErr['Error Msg'];
            this.alertStatusMessage = false;
          }
          this.updateSymbolVal = false;
          form.resetForm();
          if(resSucc != '') this.getSymbolList();
        },
        error => {

        },
        () => {

        }
      )
    }
  }

  closeAlert() {
    this.formResponseMsg = '';
  }

  updateSymbol(sym) {
    this.updateSymbolVal = true;
    this._utils.scrollToY(0, 400, 'easeInOutQuint');
    this.createSymbolForm.patchValue({
      asset_name: sym.assetName,
      symbol_name: sym.symbol,
      symbol_id: sym.id
    });
  }


  confirmDelete(id) {
    const deleteDialog = this.dialog.open(ConfirmdialogComponent,{
      width: '400px',
      height: '170px',
      data: {
        message: 'Are you sure to delete?'
      }
    });

    deleteDialog.afterClosed().subscribe(
      data => {
        if(data) this.deleteSymbol(id);
      }
    );
  }

  deleteSymbol(id) {
    let data = { id: id };
    this._api.fetchApiData( this._urls.deleteSymbolUrl, data ).subscribe(
      (data:any) => {
        let response = data.data;
        if(response != 0 ) this.deleteMenuFromList(response);
      },
      error => {

      },
      () => {
        this.showLoader = false;
      }
    );
  }

  deleteMenuFromList(id) {
    this.symbolList = this._utils.filterArrayObj(this.symbolList,'id',id);
  }


  cancelSymbol() {
    this.updateSymbolVal = false;
  }


  getSymbolList() {
    this.showLoader = true;
    this._api.fetchApiData( this._urls.listSymbolUrl, {} ).subscribe(
      (data:any) => {
        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') this.symbolList = resSucc;
      },
      error => {

      },
      () => {
        this.showLoader = false;
      }
    )
  }

  ngOnInit() {
    this.createSymbolFormInit();
    this.getSymbolList();
  }

}
