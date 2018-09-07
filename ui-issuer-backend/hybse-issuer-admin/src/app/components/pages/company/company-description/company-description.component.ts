import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../services/company/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { markets } from '../../../../data/market-list';
import { countries } from '../../../../data/countries';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { DataCommunication } from '../../../../services/utilities/data.comm';


@Component({
  selector: 'hybse-issueradmin-company-description',
  templateUrl: './company-description.component.html',
  styleUrls: ['./company-description.component.css']
})
export class CompanyDescriptionComponent implements OnInit {

  constructor( private _cs:CompanyService,
    private _fb: FormBuilder,
    private _req: ApirequestService,
    private _url: ApiurlsService,
    private _data: DataCommunication,
    private _utils: UtilityService ) {

  }

  editMode:boolean = false;
  createCompDescForm:FormGroup;
  companyDetails:any = {};
  markets:any = markets;
  countries:any = countries;
  companyID:any = '';
  loaderToggle:boolean = true;
  /* Initialize Company Information Form */
  createCompDescFormInit() {
    this.createCompDescForm = this._fb.group({
      'comp_description': ['', [Validators.required]],
      'outstanding_shares': ['', [Validators.required]],
      'high_shareholders': ['', [Validators.required]],
      'low_shareholders': ['', [Validators.required]]
    });
  }

  setEditedValues(comp) {
    this.createCompDescForm.patchValue(
      {
        comp_description: comp.companyProfile.companyActivity,
        outstanding_shares: comp.companyFinancial.outstandingShares,
        high_shareholders: comp.companyFinancial.shareValue,
        low_shareholders: comp.companyFinancial.authorizedShares
      }
    );
  }



  /* Get Edit Mode of Form */
  getEditMode() {
    this._cs.editMode.subscribe(
      val => {
        this.editMode = val;
      }
    );
  }


  /* Saving Company Description form */
  saveCompDescForm() {
    if(this.createCompDescForm.valid) {
      let formVal = this.createCompDescForm.value;
      let data = {
        id: this._data.companyID,
        companyActivity: formVal.comp_description,
        outstandingShares: formVal.outstanding_shares,
        shareValue: formVal.high_shareholders,
        authorizedShares: formVal.low_shareholders
      };
      this._req.fetchApiData(this._url.companyDescUrl,data).subscribe(
        data => {
          console.log(data);
          this._cs.editMode.next(false);
        },
        err => {

        },
        () => {

        }
      )

    }

  }


  /* Getting Company Information */
  getCompDetails() {
    this._cs.companyDetails.subscribe(
      (val) => {
        if(Object.keys(val).length !== 0) {
          this.loaderToggle = false;
          this.companyDetails = val;
          this.setEditedValues(val);
        }
      }
    )
  }

  ngOnInit() {
    this.getEditMode();
    this.createCompDescFormInit();
    this.getCompDetails();

  }

  ngOnDestroy() {
    this._cs.editMode.next(false);
  }
}
