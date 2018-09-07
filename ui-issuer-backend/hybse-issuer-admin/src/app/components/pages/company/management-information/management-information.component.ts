import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { CompanyService } from '../../../../services/company/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fsKey } from '../../../../config/hybse.config';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { ToastsManager } from 'ng2-toastr';
import { DataCommunication } from '../../../../services/utilities/data.comm';

declare var filestack:any;
declare var filepicker:any;


@Component({
  selector: 'hybse-issueradmin-management-information',
  templateUrl: './management-information.component.html',
  styleUrls: ['./management-information.component.css']
})
export class ManagementInformationComponent implements OnInit {

  constructor( private _cs:CompanyService,
    private _req: ApirequestService,
    private _utils: UtilityService,
    private _url: ApiurlsService,
    private _toastr: ToastsManager,
    private _vcr: ViewContainerRef,
    private _data: DataCommunication,
    private _fb: FormBuilder ) {
      this._toastr.setRootViewContainerRef(this._vcr);
  }

  editMode:boolean = false;
  companyDetails:any = {};
  createManagementInfoForm:FormGroup;
  managementInfo:any = [];
  modalPopUpToggle:boolean = false;
  memberEdit:boolean = false;
  modalAnimateClass = "slideInDown";
  memberImage:string = '';
  memberID:any = 0;
  companyID:any = '';
  deletedManagementInfo:any = {};

  @ViewChild('manageEdit') manageEl:ElementRef;
  managementTitles:any[] = [{
    btnText: 'Add Member',
    title: 'Add new Member of the Management Board'
  },{
    btnText: 'Save Member',
    title: 'Save Member of the Management Board'
  }];
  managementTitle:string= this.managementTitles[0].title;
  btnText:string= this.managementTitles[0].btnText;




  /* Get Edit Mode of Form */
  getEditMode() {
    this._cs.editMode.subscribe(
      val => {
        this.editMode = val;
      }
    );
  }

  /* Initialize Management Information Form */
  createManagementInfoFormInit() {
    this.createManagementInfoForm = this._fb.group({
      'first_name': ['', [Validators.required]],
      'second_name': ['', [Validators.required]],
      'position': ['', [Validators.required]],
      'telephone': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'share_amt': ['', [Validators.required]],
      'member_image': ['']
    });
  }

  /* Getting Company Information */
  getCompDetails() {
    this._cs.companyDetails.subscribe(
      (val) => {
        if(Object.keys(val).length !== 0) {
          this.companyDetails = val;
          this.managementInfo = val.companyManagement;
        }
      }
    )
  }

  /* Editing Management Information */
  editManagement(info) {
    let targetTop = this.manageEl.nativeElement.offsetTop;
    this._utils.scrollToY(targetTop, 400, 'easeInOutQuint');
    this.managementTitle = this.managementTitles[1].title;
    this.btnText = this.managementTitles[1].btnText;
    this.memberID = info.idCompanyManagement;
    this.memberImage = info.memberImage;
    this.memberEdit = true;
    this.createManagementInfoForm.patchValue({
      'first_name': info.ofcrfirstname,
      'second_name': info.ofcrlastname,
      'telephone': info.ofcrphone,
      'email': info.ofcremail,
      'position': info.position,
      'share_amt': info.ofcrshares,
      'member_image': info.memberImage
    })
  }

  /* Deleting Management Information */
  deleteManagement(info) {
    this.modalPopUpToggle = true;
    this.deletedManagementInfo = info;
    console.log('this.deletedManagementInfo',this.deletedManagementInfo);
  }
  confirmDeleteMgmt() {
    let data = {
      idCompanyManagement : this.deletedManagementInfo.idCompanyManagement
    };

    this._req.fetchApiData(this._url.deleteManagementUrl,data).subscribe(
      (data:any) => {
        console.log(data);
        this.modalClose();
        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') {
          this.getMgmtsMem(resSucc);
          this._toastr.success('Member Information Deleted Successfully');
        }
      },
      error => {

      },
      () => {

      }
    )
  }

  getMgmtsMem(resSucc) {
    this.managementInfo = this._utils.filterObj(this.managementInfo,'idCompanyManagement',resSucc.idCompanyManagement);
  }


  modalClose() {
    //this.modalAnimateClass = this.modalPopUpToggle ? 'slideInDown' : 'modalSlideUp';
    this.deletedManagementInfo = {};
    this.modalAnimateClass = 'modalSlideUp';
    setTimeout(()=> {
      this.modalPopUpToggle = false;
      this.modalAnimateClass = 'slideInDown';
    }, 300 );

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
      transformations: {
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
    if(fileUploaded.length > 0 ) {
      this.memberImage = fileUploaded[0].url;
      this.createManagementInfoForm.get('member_image').setValue(fileUploaded[0].url);
    }
  }


  /* Saving Management Information */
  saveManagementInfoForm() {
    if(this.createManagementInfoForm.valid) {
      let formVal = this.createManagementInfoForm.value;
      let url = this._url.addManagementUrl;
      let data:any = {
        id: this._data.companyID,
        managementInfo: [{
          //idCompanyManagement:	this.memberID,
          ofcrmail: formVal.email,
          ofcrfirstname: formVal.first_name,
          ofcrlastname: formVal.second_name,
          ofcrphone: formVal.telephone,
          ofcrshares: formVal.share_amt,
          position: formVal.position,
          memberImage: this.memberImage
        }]
      };
      if(this.memberEdit) {
        data.managementInfo[0].idCompanyManagement = this.memberID;
        url = this._url.companyManagementUrl;
      }

      this._req.fetchApiData(url,data).subscribe(
        (data:any) => {
          console.log(data);
          let resSucc = data.data;
          let resErr = data.error;
          if(resSucc != '') {
            this.changeMemberInfo(formVal);
            this._cs.editMode.next(false);
            this._toastr.success('Member Information Saved Successfully');
            if(!this.memberEdit) this.addNewMember(formVal,resSucc)
          }
          if(resErr != '') {

          }
          this.resetMemberForm();
        },
        error => {

        },
        () => {

        }
      )
    }

  }


  addNewMember(val,data) {
    this.managementInfo.push({
      idCompanyManagement: data.idCompanyManagement,
      memberImage: val.member_image,
      ofcremail: val.email,
      ofcrfirstname: val.first_name,
      ofcrlastname: val.second_name,
      ofcrphone: val.telephone,
      ofcrshares: val.share_amt,
      position: val.position
    })
  }

  changeMemberInfo(val) {
    this.managementInfo.forEach(ele => {
      if(this.memberID == ele.idCompanyManagement) {
        ele.memberImage = val.member_image;
        ele.ofcremail = val.email;
        ele.ofcrfirstname = val.first_name;
        ele.ofcrlastname = val.second_name;
        ele.ofcrphone = val.telephone;
        ele.ofcrshares = val.share_amt;
        ele.position = val.position;
      }
    });
  }

  /* Resetting Member Form */
  resetMemberForm() {
    this.createManagementInfoForm.reset();
    this.memberEdit = false;
    this.managementTitle = this.managementTitles[0].title;
    this.btnText = this.managementTitles[0].btnText;
    this.memberID = 0;
    this.memberImage = '';
  }



  ngOnInit() {
    this.getEditMode();
    this.getCompDetails();
    this.createManagementInfoFormInit();
  }


  ngOnDestroy() {
    this._cs.editMode.next(false);
  }
}
