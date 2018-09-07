import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'ng-animate';
import { FormBuilder, FormGroup, Validators,FormControl, AbstractControl,FormGroupDirective } from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { UtilityService } from '../../../../services/utilities/utilities.services';

declare var $:any;


@Component({
  selector: 'hybse-admin-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation( fadeInDown,{
      params: {
        timing: 1,
        a: '-10px'
      }
    }))])
  ],
})
export class CompanyEditComponent implements OnInit {

  constructor( private _fb:FormBuilder,
    private _req: ApirequestService,
    private _urls: ApiurlsService,
    private _utils: UtilityService,
    private route: ActivatedRoute,
    private router: Router ) { }

  fadeInDown:any;
  compID:any = '';
  compUpdateForm:FormGroup;
  companyDetails:any;
  userDetails:any;
  memberDetails:any = [];
  alertStatusMessage:boolean = false;
  formResponseMsg:string = '';
  showLoader:boolean = false;

  compUpdateFormInit() {
    this.compUpdateForm = this._fb.group({
        'isPlatin': ['yes'],
        'companyName': [''],
        'companyAddress': [''],
        'companyPostal': [''],
        'city': [''],
        'country': [''],
        //'primaryOfficer': [''],
        'primaryOfficerTele': [''],
        'primaryOfficerFax': [''],
        'businessActivities': [''],
        'website': [''],
        'incorporationCity': [''],
        'incorportaionCountry': [''],
        'incorporationYear': [''],
        'registerCommerce': [''],
        'employees': [''],
        'companyDesc': this._fb.group({
          'sharValue': [''],
          'companyShare': [''],
          //'shareListed': [''],
          'lowShareHolder': [''],
          //'prevYearTurnOver': [''],
          'prevYearProfit': [''],
          //'forecastTurnOver': [''],
          'forecastNetProfit': [''],
          'operativeCashFlow': [''],
          'DividendLastYr': [''],
          'DividendThisYr': [''],
          'annualTurnOver': [''],
          'totalAssetsThisYr': [''],
          'totalAssetsLastYr': [''],
          'companyActivities': [''],
          //'competitor': [''],
          'dividendIssueDate': [''],
          //'dividentAmt': ['']
        })
      }
    );

  }

  getCompanyDetails() {
    let data = { id: this.compID };
    this._req.fetchApiData(this._urls.compDetailUrl,data).subscribe(
      (data:any) => {
        console.log(data);
        let response = data.data;
        if(response != '' ) {
          this.companyDetails = response;
          this.userDetails = response.user;
          this.memberDetails = response.companyManagement;
          this.setFormData(this.companyDetails);
        }
      },
      error => {

      },
      () => {

      }
    )
  }

  updateCompanyDetails() {
    let compVal = this.compUpdateForm.value;
    //this.companyDetails
    this.showLoader = true;
    let data = {
      companyName: compVal.companyName,
      address1: compVal.companyAddress,
      address2: this.companyDetails.company.address2,
      annualTurnover: compVal.companyDesc.annualTurnover,
      authorizedShares: this.companyDetails.companyFinancial.authorizedShares,
      businessActivities: parseInt(compVal.businessActivities),
      city: compVal.city,
      companyActivity: compVal.companyDesc.companyActivities,
      country: compVal.country,
      createdAt: this.companyDetails.company.createdAt,
      currentAssets: compVal.companyDesc.totalAssetsThisYr,
      currentDivident: compVal.companyDesc.DividendThisYr,
      dividentIssueDate: compVal.companyDesc.dividendIssueDate,
      duns: this.companyDetails.companyIbs.duns,
      companyEmail: this.companyDetails.company.companyEmail,
      employee: compVal.employees,
      estimatedProfit: this.companyDetails.companyFinancial.estimatedProfit,
      estimatedRevenue: this.companyDetails.companyFinancial.estimatedRevenue,
      facebook: this.companyDetails.company.facebook,
      fax: compVal.primaryOfficerFax,
      googleplus: this.companyDetails.company.googleplus,
      ibin: this.companyDetails.companyIbs.ibin,
      iduser: this.companyDetails.user.iduser,
      incorporationCity: compVal.incorporationCity,
      incorporationCountry: compVal.incorportaionCountry,
      incorporationNumber: this.companyDetails.companyProfile.incorporationNumber,
      incorporationYear: compVal.incorporationYear,
      isin: this.companyDetails.companyIbs.isin,
      isplatin: this.companyDetails.isplatin,
      issueAt: this.companyDetails.companyIbs.issuedAt,
      lastYearAssets: this.companyDetails.companyFinancial.lastYearAssets,
      lastYearDivident: this.companyDetails.companyFinancial.lastYearDivident,
      lastYearProfit: this.companyDetails.companyFinancial.lastYearProfit,
      lastYearRevenue: this.companyDetails.companyFinancial.lastYearRevenue,
      linkedin: this.companyDetails.company.linkedin,
      modifiedAt: this.companyDetails.company.modifiedAt,
      operativeCashFlow: this.companyDetails.companyFinancial.operativeCashFlow,
      outstandingShares: this.companyDetails.companyFinancial.outstandingShares,
      phone1: this.companyDetails.company.phone1,
      phone2: this.companyDetails.company.phone2,
      phone3: this.companyDetails.company.phone3,
      shareHoldingCapital: this.companyDetails.companyFinancial.shareHoldingCapital,
      shareValue: compVal.companyDesc.sharValue,
      shareholders: compVal.companyDesc.lowShareHolder,
      twitter: this.companyDetails.company.twitter,
      website: compVal.website,
      wkn: this.companyDetails.companyIbs.wkn,
      zipcode: compVal.companyPostal,
      id: this.compID
    };

    this._req.fetchApiData(this._urls.companyUpdateUrl,data).subscribe(
      (data:any) => {
        console.log('Compnay',data);
        let res = data.data;
        let resErr = data.error;
        if( res != '' ) {
          this.showLoader = false;
          this.getUserFormStat({ status: true, message: 'Company Details has been Updated'  });
          setTimeout(()=>{ this.router.navigate(['/company/lists']) },2000);
        }
      }
    )
  }


  setFormData(data) {
    this.compUpdateForm.patchValue({
      isPlatin: data.company.isplatin ? 'yes' : 'no',
      companyName : data.company.companyName,
      city: data.company.city,
      companyAddress: data.company.address1 + ', ' + data.company.address2,
      country: data.company.country,
      companyPostal: data.company.zipcode,
      businessActivities: data.companyProfile.businessActivities.toString(),
      incorporationCity : data.companyProfile.incorporationCity,
      incorportaionCountry: data.companyProfile.incorporationCountry,
      incorporationYear: data.companyProfile.incorporationYear,
      employees: data.companyProfile.employee,
      registerCommerce: data.companyProfile.incorporationCountry,
      primaryOfficerTele: data.company.phone1,
      primaryOfficerFax: data.company.fax,
      website: data.company.website,
      companyDesc: {
        sharValue: data.companyFinancial.shareValue,
        //shareListed: '',
        lowShareHolder: data.companyFinancial.shareholders,
        //prevYearTurnOver: '',
        /*prevYearProfit: data.companyFinancial.lastYearProfit,
        forecastTurnOver: '',
        operativeCashFlow: data.companyFinancial.operativeCashFlow,
        DividendLastYr: data.companyFinancial.lastYearDivident,
        DividendThisYr: data.companyFinancial.currentDivident,
        annualTurnOver: data.companyFinancial.annualTurnover,
        totalAssetsThisYr: data.companyFinancial.currentAssets,
        totalAssetsLastYr: data.companyFinancial.lastYearAssets, */
        companyActivities: data.companyProfile.companyActivity,
        //competitor: '',
        dividendIssueDate: data.dividentIssueDate,
        //dividentAmt: ''
      }
    });
  }

  onTabSwitch(e) {

  }

  cancelCompUpdate() {
    this.router.navigate(['/company/lists']);
  }

  getUserFormStat(e) {
    this._utils.scrollToY(0,400,'easeInOutQuint');
    this.alertStatusMessage = e.status;
    this.formResponseMsg = e.message;
    setTimeout(()=>{
      $('.alert_messages').fadeOut('400',()=>{
        setTimeout(()=>{
          this.alertStatusMessage = false;
        },1000);
      });
    },3000);

  }

  ngOnInit() {
    this.compUpdateFormInit();
    this.route.params.subscribe(
      params => {
        this.compID = params.id;
        this.getCompanyDetails();
      }
    );
  }

}
