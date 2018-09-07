import { Component, OnInit, Input } from '@angular/core';
import { BlurInputErrorMatcher } from '../../../../../modules/material/material.errror';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'ng-animate';
import { ApiurlsService } from '../../../../../services/api-urls/apiurls.service';
import { ApirequestService } from '../../../../../services/apirequest/apirequest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../../../../../services/utilities/utilities.services';



@Component({
  selector: 'hybse-admin-add-market',
  templateUrl: './add-market.component.html',
  styleUrls: ['./add-market.component.css'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation( fadeInDown,{
      params: {
        timing: 1,
        a: '-10px'
      }
    }))])
  ],
})
export class AddMarketComponent implements OnInit {

  constructor(private _fb:FormBuilder,
  private _urls:ApiurlsService,
  private _ar:ActivatedRoute,
  private _utils:UtilityService,
  private router: Router,
  private _api:ApirequestService ) { }
  fadeInDown:any;
  createMarketForm:FormGroup;
  blurMatcher = new BlurInputErrorMatcher();
  @Input() actionType:any = 'add';
  marketId:any = 0;
  symbolList:any = [];
  companyList:any = [];
  sourceSymbol:string = '';
  targetSymbol:any = [];
  primarySymbol:string = '';
  showLoader:boolean = false;
  responseMessage:string = '';

  createMarketFormInit() {
    this.createMarketForm = this._fb.group({
      'source_symbol': ['',[Validators.required]],
      'target_symbol': ['',[Validators.required]],
      'companies': ['',[Validators.required]],
      'initial_value': ['',[Validators.required]],
    });
  }


  createUpdateSubmit() {
    if(this.createMarketForm.valid) {
      this.showLoader = true;
      let formVal = this.createMarketForm.value;
      let data:any = {
        pairTarget: formVal.target_symbol,
        pairSource: formVal.source_symbol,
        idCompany: formVal.companies,
        initialValue: formVal.initial_value
      };
      let url = this._urls.createMarketUrl;

      if(this.actionType == 'edit') {
        url = this._urls.updateMarketUrl; data.id = this.marketId;
      }

      this._api.fetchApiData(url, data).subscribe(
        (data:any) => {
          let resSucc = data.data;
          this._utils.scrollToY(0,400,'easeInOutQuint');
          if(resSucc != '') {
            this.responseMessage = (this.actionType == 'add') ? 'Markets Created Successfully' : 'Markets Updated Successfully';
            setTimeout(()=>{
              this.router.navigate(['markets/list']);
            },2000);
          }
        },
        error => {

        },
        () => {
          this.showLoader = false;
        }
      )
    }
  }

  getSymbolList() {
    this._api.fetchApiData( this._urls.listSymbolUrl, {} ).subscribe(
      (data:any) => {
        console.log(data);
        let resSucc = data.data;
        if(resSucc != '') this.symbolList = resSucc;
      },
      error => {

      },
      () => {

      }
    )
  }
  getCompanyList() {
    this._api.fetchApiData( this._urls.compListUrl, {} ).subscribe(
      (data:any) => {
        console.log(data);
        let resSucc = data.data;
        if(resSucc != '') this.companyList = resSucc;
      },
      error => {

      },
      () => {

      }
    )
  }

  getMarketDetails() {
    this.showLoader = true;
    let data = {id: this.marketId }
    this._api.fetchApiData( this._urls.marketDetailUrl, data ).subscribe(
      (data:any) => {
        console.log( 'MarketDetails', data );
        let resSucc = data.data;
        if(resSucc != '') {
          this.setMarketValues(resSucc);
        }
      },
      error => {

      },
      () => {
        this.showLoader = false;
      }
    )
  }

  getPrimarySymbol() {
    this._api.fetchApiData( this._urls.primarySymbolUrl, {} ).subscribe(
      (data:any) => {
        console.log('Primary',data);
        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') this.targetSymbol = resSucc;
      },
      error => {

      },
      () => {
        this.showLoader = false;
      }
    )
  }



  setMarketValues(data) {
    this.createMarketForm.patchValue({
      'source_symbol': data.pairSource.toString(),
      'target_symbol': data.pairTarget.toString(),
      //'target_symbol': '1',
      'companies': data.idCompany.toString(),
      'initial_value': data.initialValue,
    });
    let srcSym:any = { value: data.pairSource.toString() }
    let tarSym:any = { value: data.pairTarget.toString() }
    this.symbolNameChange(srcSym);
    this.targetNameChange(tarSym);
  }


  symbolNameChange(eve?) {
    let val = eve.value;
    this.sourceSymbol = (val != undefined) ? this._utils.getPropValFromObj(this.symbolList,'id','symbol',val) : '';
  }



  targetNameChange(eve?) {
    let val = eve.value;
    //if(val != undefined) this.targetSymbol = this._utils.getPropValFromObj(this.symbolList,'id','symbol',val);
    this.primarySymbol = (val != undefined) ? this._utils.getPropValFromObj(this.targetSymbol,'id','symbol',val) : '';
  }

  cancelMarketCreate() {
    this.router.navigate(['/markets/list']);
  }

  ngOnInit() {
    this.createMarketFormInit();
    this.getSymbolList();
    this.getPrimarySymbol();
    this.getCompanyList();
  }

  ngOnChanges() {
    if(this.actionType == 'edit') {
      this._ar.params.subscribe(
        param => {
          this.marketId = param.id;
          this.getMarketDetails();
        }
      )
    }
  }

}
