import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CompanyService } from '../../../../services/company/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fsKey } from '../../../../config/hybse.config';
import { countries } from '../../../../data/countries';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataCommunication } from '../../../../services/utilities/data.comm';


declare var filestack:any;
declare var filepicker:any;

@Component({
  selector: 'hybse-issueradmin-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.css']
})
export class CompanyInformationComponent {

  constructor( private _cs:CompanyService,
               private _utils: UtilityService,
               private _req: ApirequestService,
               private _url: ApiurlsService,
               private _fb: FormBuilder,
               private router: Router,
               private route: ActivatedRoute,
               private _data: DataCommunication,
               private vcr: ViewContainerRef,
               private _tostr: ToastsManager ) {
      this._tostr.setRootViewContainerRef(this.vcr);
  }

  editMode:boolean = false;
  loaderToggle:boolean = true;
  createCompInfoForm:FormGroup;
  companyDetails:any = [];
  logoDetails:any = [];
  companyID:any = '';
  //companyLogoUrl:string = 'https://cdn.filestackcontent.com/0vdWA4SletMIHoMVWMZQ';
  companyLogoUrl:string = '';
  companyLogoFirst:string = '';
  countries:any = countries;
  /* Initialize Company Information Form */
  createCompInfoFormInit() {
    this.createCompInfoForm = this._fb.group({
      'comp_name': ['', [Validators.required]],
      'comp_website': ['', [Validators.required]],
      'comp_mail': ['', [Validators.required]],
      'comp_country': ['', [Validators.required]],
      'comp_street': ['', [Validators.required]],
      'comp_street2': ['', [Validators.required]],
      'comp_pincode': ['', [Validators.required]],
      'comp_city': ['', [Validators.required]],
      'comp_telephone': ['', [Validators.required]],
      'comp_employees': ['', [Validators.required]]
    });
  }


  /* Get Edit Mode of Form */
  getEditMode() {
    this._cs.editMode.subscribe(
      val => {
        this.editMode = val;
      }
    );
  }

  /* Save Company Information */
  saveCompanyInfo() {
    if(this.createCompInfoForm.valid) {
      let formVal:any = this.createCompInfoForm.value;
      let documentInfo:any = [];
      if(this.companyLogoUrl != '') {
        documentInfo = [{
          docTitle: 'logo',
          docName: this.companyLogoUrl,
          docType: 1
        }];
        if(this.companyLogoFirst == '' ) documentInfo[0].idCompanyDocument = this.logoDetails[0].idCompanyDocument;
      }
      
      let data = {
        id: this._data.companyID,
        companyName: formVal.comp_name,
        website: formVal.comp_website,
        companyEmail: formVal.comp_mail,
        country: formVal.comp_country,
        address1: formVal.comp_street,
        address2: formVal.comp_street2,
        city: formVal.comp_city,
        zipcode: formVal.comp_pincode,
        phone1: formVal.comp_telephone,
        documentInfo: documentInfo
      };
      this._req.fetchApiData(this._url.companyInfoUrl,data).subscribe(
        data => {
          console.log(data);
          this._cs.editMode.next(false);
        },
        error => {

        },
        () => {

        }
      );
    }
  }


  setEditedValues(comp) {
    let countryCode = this._utils.filterArrayObj(countries,'alpha-3',comp.company.country);
    this.createCompInfoForm.patchValue(
      {
        comp_name: comp.company.companyName,
        comp_website: comp.company.website,
        comp_mail: comp.company.companyEmail,
        comp_country: countryCode[0]['alpha-3'],
        comp_street: comp.company.address1,
        comp_street2: comp.company.address2,
        comp_pincode: comp.company.zipcode,
        comp_city: comp.company.city,
        comp_telephone: comp.company.phone1,
        comp_employees: comp.companyProfile.employee
      }
    );
  }


  /* Getting Company Information */
  getCompDetails() {
    this._cs.companyDetails.subscribe(
      (val) => {
        if(Object.keys(val).length !== 0) {
          this.loaderToggle = false;
          this.companyDetails = val;
          if(val.companyDocument != '') this.getDocumentDetails(val.companyDocument);
          this.setEditedValues(val);
        }
      },
      (error) => {
        console.log('Error',error);
      }
    )
  }


  getDocumentDetails(doc) {
    this.logoDetails = this._utils.filterArrayObj(doc,'docTitle','logo');
    if(this.logoDetails.length != 0) {
      this.companyLogoUrl = this.logoDetails[0].docName;
    }
  }



  fsFileUpload() {
    let fsClient = filestack.init(fsKey);
    let fileAccepted = ["image/*"];
    let maxSize = 2097152;
    let fileOptions = {
      fromSources:["local_file_system"],
      accept: fileAccepted,
      maxFiles:1,
      minFiles:1,
      transformations:{
        crop:true,
        circle:false
      },
      maxSize:maxSize
    };

    fsClient.pick(fileOptions).then((response) => {
      this.editMode = true;
      this.fileUploadHandler(response);
    });
  }

  fileUploadHandler(res) {
    let fileUploaded = res.filesUploaded;
    (fileUploaded.length > 0 ) ? this.companyLogoUrl = fileUploaded[0].url : this.companyLogoFirst = 'first';
  }



  ngOnInit() {
    this.getEditMode();
    this.createCompInfoFormInit();
    this.getCompDetails();

  }


  ngOnDestroy() {
    this._cs.editMode.next(false);

  }


}
