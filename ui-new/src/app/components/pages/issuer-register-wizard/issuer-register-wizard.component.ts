import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray,FormControl, FormBuilder, FormArrayName ,Validators } from '@angular/forms';
import { ViewChild,ElementRef,HostListener } from '@angular/core';
import { ApiDataServices } from '../../../services/apiservices/api.services';
import { UtilityService } from '../../../services/utilities/utilities.services';
import { IssuerregisterwizardService } from '../../../services/registration/issuerregisterwizard.service';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { AbstractControl } from '@angular/forms';
import { StepperOptions,  NgxStepperComponent } from '../../../../../node_modules/ngx-stepper';
import { HttpClient,HttpResponse,HttpEventType} from '@angular/common/http';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';
import { fsKey } from '../../../config/hybse.config';




declare var Cropper:any;
declare var filestack:any;
declare var filepicker:any;
@Component({
  selector: 'hybse-issuer-register-wizard',
  templateUrl: './issuer-register-wizard.component.html',
  styleUrls: ['./issuer-register-wizard.component.css']
})
export class IssuerRegisterWizardComponent implements OnInit {
    @ViewChild('stepper')
    public steppers: NgxStepperComponent;

    public options: StepperOptions = {
        vertical: false,
        linear: true,
        enableSvgIcon: true
    };

  constructor(public _fb:FormBuilder,
    public _rs:IssuerregisterwizardService,
    public route:ActivatedRoute,
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer,
    public _urls:ApiurlsService,
    public _utils:UtilityService,
    private _api: ApiDataServices) { }

    companyRegisterForm:FormGroup;
    userID:any;
    Mesg:string = '';


    companyRegisterFormInit()
    {
        this.companyRegisterForm = this._fb.group({
                "companyInformation": this._fb.group({
                    'companyName': ['',[Validators.required]],
                    'address1': ['', [Validators.required]],
                    'address2': [''],
                    'zipcode': ['', [Validators.required]],
                    'city': ['', [Validators.required]],
                    'website': ['', [Validators.required,this.validateCompanywebsite]],
                    'companyEmail': ['',[Validators.required,this.validateEmail]],
                    'companyFax': ['',[Validators.required,this.validateNumber,this.validateMinimumnumber]],
                    'country': ['', [Validators.required]],
                    'countrycode':['',Validators.required],
                    'phone1': ['', [Validators.required,this.validateNumber,this.validateMinimumnumber]],
                    'linkedin': ['',this.validatewebsite],
                    'twitter': ['',this.validatewebsite],
                    'facebook': ['',this.validatewebsite],
                    'googleplus': ['',this.validatewebsite],
                    'otherMedia':['',this.validatewebsite],
                    'employee': ['', [Validators.required,this.validateNumber]]
                },{ updateOn: 'blur'}),
            "companydescription": this._fb.group({
                'incorporationCountry': ['', [Validators.required]],
                'incorporationCity': ['', [Validators.required]],
                'incorporationYear': ['', [Validators.required,this.validateNumber]],
                'incorporationNumber': ['', [Validators.required]],
                'authorizedShares': ['', [Validators.required,this.validateNumber]],
                'shareValue': ['', [Validators.required,this.validateNumber]],
                'outstandingShares': ['', [Validators.required,this.validateNumberDecimal]],
                'companyActivity': ['', [Validators.required]],
                'duns': ['', [Validators.required]],
                'desiredDate': this._fb.group({
                    'year': ['', [Validators.required]],
                    'month': ['', [Validators.required]],
                    'day': ['', [Validators.required]]
                },{validator: [this.checkDesiredDate] }),
                'isin': ['', [Validators.required]],
                'ibin': ['', [Validators.required]],
                'shareholders': ['', [Validators.required,this.validateNumberDecimal]],
                'businessActivities': ['', [Validators.required]]
            },{ updateOn: 'blur' }),

            "management": this._fb.group({
                    'fullfirstName': ['', [Validators.required]],
                    'fulllastName': ['', [Validators.required]],
                    'phone': ['', [Validators.required,this.validateNumber]],
                    'managementEmail': ['', [Validators.required,this.validateEmail]],
                    'shareholdingCapital': ['', [Validators.required,this.validateNumberDecimal,this.validateShare]],
                    'contact_info': this._fb.array(
                        [
                            this._fb.group({
                                'ofcrfirstname': ['', [Validators.required]],
                                'ofcrlastname': ['', [Validators.required]],
                                'ofcrphone': ['',[Validators.required,this.validateNumber,this.validateMinimumnumber]],
                                'ofcrmail': ['', [Validators.required,this.validateEmail]],
                                'ofcrshares': ['',[Validators.required,this.validateNumberDecimal,this.validateShare]],
                            })
                        ]
                    ),
            },{ updateOn: 'blur' })

            }

        );
    }

    disabledCloneBtn:boolean = false;
    addManagementMember(){
        // let getManagement:any = this.companyRegisterForm.get('management');
        // if( getManagement.length < 3 ) {

        //      this.disabledCloneBtn = true;
        // }
        let getManagement:any = this.companyRegisterForm.get('management').get('contact_info');
        let seed = this;
        if( getManagement.length < 3 ) {
            getManagement.push(
                this._fb.group({
                    'ofcrfirstname': ['', [Validators.required]],
                    'ofcrlastname': ['', [Validators.required]],
                    'ofcrphone': ['',[Validators.required,seed.validateNumber]],
                    'ofcrmail': ['',[Validators.required,seed.validateEmail]],
                    'ofcrshares': ['', [Validators.required]],
                })
            );
            if( getManagement.length == 3 ) this.disabledCloneBtn = true;
        }
    }
    removeContact(ind) {
        let getManagement:any = this.companyRegisterForm.get('management').get('contact_info');
        getManagement.removeAt(ind);
        if( this.mgmtOfficerProfData.length > 0 ) this.mgmtOfficerProfData.splice(ind,1);
    }
    companyRegisterFormValidate:boolean=false;

    validateEmail(input:FormControl) {
        let val = input.value;
        let regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!regex.test(val) && val != '' )  {
            return {
                emailInvalid: true
            }
        }
        return null;
    }

    validateNumber(input:FormControl) {
        let val = input.value;
       let regex =/^\d+$/;
        if (!regex.test(val) && val != '' )  {
            return {
                numberInvalid: true
            }
        }

        return null;
    }

    validateNumberDecimal(input:FormControl) {
        let val = input.value;
       let regex =/((\d+)((\.\d{1,2})?))$/;
        if (!regex.test(val) && val != '' )  {
            return {
                numberInvalid: true
            }
        }

        return null;
    }


    validatewebsite(input:FormControl) {
        let val = input.value;
        let regex =/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
        if (!regex.test(val) && val != '' )  {
            return {
                websiteInvalid: true
            }
        }
        return null;
    }


    validateMinimumnumber(input:FormControl){
    let val=input.value;
    if(val.length < 5 && val != '' ){
        return {
            numberMinimum: true
        }
    } return null;
    }

    validateShare(input:FormControl){
        let val=input.value;
        if(val>100 && val != ''){
            return{
                shareInvalid: true
            }
        }return null;
    }


    validateCompanywebsite(input:FormControl) {
        let val = input.value;
        let regex =/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
        if (!regex.test(val) && val != '' )  {
            return {
                websiteInvalid: true
            }
        }
        return null;
    }

    SocialMedia:string;
    findMedia(val){
       switch(val){
           case "none":
           this.SocialMedia="";

           document.getElementById("otherMedia").style.display = "none";
           break;

           case "Pinterest":
           this.SocialMedia="Pinterest";

           document.getElementById("otherMedia").style.display = "block";
           break;

           case "Twitter":
           this.SocialMedia="Twitter";
           document.getElementById("otherMedia").style.display = "block";
           break;

           case "Tumblr":
           this.SocialMedia="Tumblr";
           document.getElementById("otherMedia").style.display = "block";
           break;

           case "Wordpress":
           this.SocialMedia="Wordpress";
           document.getElementById("otherMedia").style.display = "block";
           break;



       }
    }



    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }

    checkDesiredDate(control:AbstractControl){
        let year = control.get('year').value;
        let month = control.get('month').value;
        let day = control.get('day').value;
        let currentDate:any = new Date();
        let inputDate:any = ''
        if( year != '' && month != '' && day != '' ) {
            inputDate = new Date(year,month-1,day);
            let timeDiff = new Date(inputDate).getTime() - new Date(currentDate).getTime();
            let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if( diffDays < 30 ) {
                return {
                    isDateValid: true
                }
            }
        }
        return null;
    }

companyDuplication:boolean = false ;
    companyRegisterFormSubmit() {
        this.companyRegisterFormValidate = true;
        let formVal = this.companyRegisterForm.value;
        // console.log('formVal',formVal);

        if (this.companyRegisterForm.valid) {
          let documentInfo = this.getDocumentDetails();
          let data = {
              // companyName: this.issuerDetail.firstName + this.issuerDetail.lastName,
              companyName:formVal.companyInformation.companyName,
              address1: formVal.companyInformation.address1,
              address2: formVal.companyInformation.address2,
              zipcode: formVal.companyInformation.zipcode,
              city: formVal.companyInformation.city,
              website: formVal.companyInformation.website,
              companyEmail: formVal.companyInformation.companyEmail,
              country: formVal.companyInformation.country,
              phone1: formVal.companyInformation.phone1,
              linkedin: formVal.companyInformation.linkedin,
              twitter: formVal.companyInformation.twitter,
              facebook: formVal.companyInformation.facebook,
              googleplus: formVal.companyInformation.googleplus,
              employee: formVal.companyInformation.employee,
              documentInfo: documentInfo,
              incorporationCountry: formVal.companydescription.incorporationCountry,
              incorporationCity: formVal.companydescription.incorporationCity,
              incorporationYear: formVal.companydescription.incorporationYear,
              incorporationNumber: formVal.companydescription.incorporationNumber,
              authorizedShares: formVal.companydescription.authorizedShares,
              shareValue: formVal.companydescription.shareValue,
              outstandingShares: formVal.companydescription.outstandingShares,
              companyActivity: formVal.companydescription.companyActivity,
              businessActivities: formVal.companydescription.businessActivities,
              dividentIssueDate: formVal.companydescription.year + formVal.companydescription.month + formVal.companydescription.day,
              duns: formVal.companydescription.duns,
              isin: formVal.companydescription.isin,
              ibin: formVal.companydescription.ibin,
              shareholders: formVal.companydescription.shareholders,
              // fullName: formVal.management.fullfirstName + formVal.management.fulllastName,
              // phone:formVal.management.phone,
              // managementEmail:formVal.management.managementEmail,
              // shareholdingCapital:formVal.management.shareholdingCapital,
              managementInfo: this.contactInfoVal,
              idUser:this.userID
          };

          this._rs.company(data).subscribe(
              (data:any) => {
                  let resSucc:any = data.data;
                  let resErr:any =data.error;
                  if( resSucc != '' ){
                    this.Mesg = 'Thank you for registration.We will check your information and sends you within the next days a verification email.Please be patient';
                  }
                  if( resErr != '' ){
                    this.Mesg = resErr['Error Description'];
                  }
                  
              },
              error => {

              },
              () => {

              }
          );

        }
        else{

        }
    }


    getDocumentDetails() {
      let files = [];
      if(this.companyLogoData != '') {
        files.push({
          docTitle: 'logo',
          docName: this.companyLogoData.url,
          docType: 1,
        })
      }
      if(this.compFinancialDoc.length > 0 ) {
        this.compFinancialDoc.forEach((ele,ind)=>{
          files.push({
            docTitle: 'document'+ ind+1,
            docName: ele.url,
            docType: ind+2,
          })
        })
      }

      return files;
    }



    issuerDetail:any;
    getIssuerDetails(id) {
        let data = { id: id };
        this._rs.issuerDetail(data).subscribe(
            (data:any) => {
                let res = data.data;
                this.issuerDetail = res;
            },
            error => {

            },
            () => {

            }
        )
    }

    validateFileTypes(fileTypes:any, name?:string) {
      var fileTypes = fileTypes.split(',');
      if( fileTypes[fileTypes.length - 1] == '' ) fileTypes.pop();
      var ext = fileTypes.filter(function(el:any){
        if(el.indexOf('.') !== -1 ) return el;
      })
      var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:()\!\#\&\;\'\?\,\\\| ])+(" + ext.join('|') + ")$");
      if( regex.test( name.toLowerCase() ) ) {
        return true;
      } else {
        return false;
      }
    }
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
    dragOverClass:boolean = false;
    dragFileOver(e) {
      e.preventDefault();
      this.dragOverClass = true;
    }
    dragFileLeave(e) {
      e.preventDefault();
      this.dragOverClass = false;
    }
    companyLogo:any='';
    croppingImg:any = '';
    uploadMessage:any = '';
    allowedFiles = '.png,.jpg';
    mediaType:any = {
      logo: 'comp_logo',
      ceo: 'ceo',
      manager: 'manager'
    }
    dropFile(e,type,i?) {
      e.preventDefault();
      let file = <File>e.dataTransfer.files[0];
      this.dragOverClass = false;
      switch (type) {
        case this.mediaType.logo:
          this.dropCompanyMedia(file,type);
        case this.mediaType.ceo:
          this.dropCompanyMedia(file,type);
          break;
        case this.mediaType.manager:
          this.dropCompanyMedia(file,type,i);
          break;
        default:
          break;
      }

    }
    companyCEO:any = '';
    dropCompanyMedia(file,type,i?) {
      let validFiles = this.validateFileTypes(this.allowedFiles,file.name);
      if(validFiles) {
        this.compLogoProgress = 0;
        this.compLogoStatus = false;
        this.getBase64(file).then(
          data => {
            this.dropInitialiser(type,data);
            setTimeout(()=> {
              const comp_img = this.getUploadedImage(type,i);
              // console.log('comp_img',comp_img)
              this.initialiseCropper(comp_img,0);
            },0);
          }
        );
      } else {
        this.uploadMessage = 'Please upload only image files with .jpeg or .png extensions';
      }
    }

    getUploadedImage(type,i=0) {
      let image;
      switch (type) {
        case this.mediaType.manager:
          image = document.getElementById('manger_img_'+i);
          break;
        default:
          image = document.getElementById('comp_media_img');
          break;
      }
      // console.log(image);
      return image;
    }

    dropInitialiser(type,data) {
      switch (type) {
        case this.mediaType.logo:
          this.companyLogo = data;
          break;
        case this.mediaType.ceo:
          this.companyCEO = data;
          break;
        default:
          break;
      }
    }

    compLogoProgress:any = 0;
    compLogoStatus:boolean = false;
    compCeoStatus:boolean = false;
    uploadMediaFiles(data,type) {
      this._api.postUpload(this._urls.imageUploadUrl,data).subscribe(
        (event:any) => {
          if(event.type === HttpEventType.UploadProgress) {
            this.compLogoProgress = Math.round(100 * event.loaded / event.total) + '%';
          } else if(event instanceof HttpResponse) {
            let res = event.body.data;
            if( res != '' ) this.checkResStatus(res,type);
          }
        }
      );
    }

    checkResStatus(res,type) {
      switch (type) {
        case this.mediaType.logo:
          this.compLogoStatus = true;
          break;
        case this.mediaType.ceo:
          this.compCeoStatus = true;
        default:
          break;
      }
    }


    initialiseCropper(img,timeout) {
      setTimeout(()=>{
        if(this.croppingImg != '') this.croppingImg.destroy();
        this.croppingImg = new Cropper(img, {
          zoomable: false,
          aspectRatio: 0,
          viewMode: 1,
          // guides: false,
          // background: false,
          crop: function(event) {

          }
        });
      },timeout);
    }

    uploadCompanyImage(e,type,i?) {
      e.preventDefault();
      let filesList = <File>e.target.files;
      // console.log(filesList);
      switch (type) {
        case this.mediaType.logo:
          this.uploadBtnImage(filesList[0],type)
          break;
        case this.mediaType.ceo:
          this.uploadBtnImage(filesList[0],type)
          break;
        case this.mediaType.manager:
          this.uploadBtnImage(filesList[0],type,i)
          break;
        default:
          break;
      }
    }

    uploadBtnImage(file,type,i?) {
      let validFiles = this.validateFileTypes(this.allowedFiles, file.name);
      if(validFiles) {
        this.getBase64(file).then(
          data => {
            // console.log('data',data);
            this.companyLogo = data;
            setTimeout(()=>{
                const comp_image = this.getUploadedImage(type,i);
                this.initialiseCropper(comp_image,0);
            },0);

          }
        );
      } else {
        this.uploadMessage = 'Please upload only image files with .jpeg or .png extensions';
      }
    }


    croppedImg:any ='';
    cropUploadLogo() {
      let seed = this;
      let mediaData:any = { id: this.userID };
      this.croppingImg.getCroppedCanvas().toBlob(function (blob) {
        seed.getBase64(blob).then(
          data => {
            seed.croppedImg = data;
            mediaData.logo = seed.croppedImg;
            seed.uploadMediaFiles(mediaData,seed.mediaType.logo);
          });
      });
    }

    cropUploadCeo() {
      let seed = this;
      let mediaData:any = { id: this.userID };
      this.croppingImg.getCroppedCanvas().toBlob(function (blob) {
        seed.getBase64(blob).then(
          data => {
            seed.croppedImg = data;
            mediaData.ceo = seed.croppedImg;
            seed.uploadMediaFiles(mediaData,seed.mediaType.ceo);
          });
      });
    }

    scrollToTop() {
      this._utils.scrollToY(0,400,'easeInOutQuint');
    }
    companyLogoData:any = '';
    mgmtCeoProfData:any = '';
    mgmtOfficerProfData:any = [];
    compFinancialDoc:any = [];
    
    fsFileUpload(type,ind?) {
      let fsClient = filestack.init(fsKey);
      let fileAccepted = ["image/*"];
      let maxSize = 2097152;
      if(type == 'financial') {
        fileAccepted = [".pdf",".doc",".docx",".docm","image/*"];
        maxSize = 10485760;
      }
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
        // console.log(response);
        this.fileUploadHandler(response,type,ind);
      });
    }

    fileUploadHandler(res,type,ind?) {
      let filesFailed = res.filesFailed;
      let fileUploaded = res.filesUploaded;
      if(fileUploaded.length > 0 ) {
        switch (type) {
          case 'logo':
            this.companyLogoData = fileUploaded[0];
            break;
          case 'ceo':
            this.mgmtCeoProfData = fileUploaded[0];
            break;
          case 'officer':
            this.manageOfficerProfImg(fileUploaded[0],ind);
            break;
          case 'financial':
            this.manageFinDocuments(fileUploaded[0],ind);
            break;
          default:
            break;
        }
      }
    }
    manageOfficerProfImg(file,i) {
      this.mgmtOfficerProfData[i] = file;
    }
    manageFinDocuments(file,i) {
      this.compFinancialDoc[i] = file;
    }



    ngOnInit() {
        this.scrollToTop();
        this.companyRegisterFormInit();
        this.route.params.subscribe(
            param => {
                this.userID = param.id;
                this.getIssuerDetails(this.userID);
            }
        )

        this._iconRegistry
            .addSvgIcon('step-done', this._sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icon/done.svg'));
        this._iconRegistry
            .addSvgIcon('step-warning', this._sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icon/warning.svg'));
    }





    public previousStep(): void {
        this.steppers.back();
    }




    stepOneInvalid:boolean = false;
   public nextStep(): void {
       if(this.companyRegisterForm.controls['companyInformation'].valid) {
           this.steppers.next();
           this.scrollToTop();
       } else {
           this.stepOneInvalid = true;
       }
        //this.steppers.next();
    }

    stepTwoInvalid:boolean = false;
    public nextStepTwo(): void {
        if(this.companyRegisterForm.controls['companydescription'].valid) {
            this.steppers.next();
            this.scrollToTop();
        } else {
            this.stepTwoInvalid = true;
        }
        //this.steppers.next();
    }

    stepThreeInvalid:boolean = false;
    contactInfoVal:any = [];
    public nextStepThree(): void {
        if(this.companyRegisterForm.controls['management'].valid) {
            this.contactInfoVal = this.getContactInfo(this.companyRegisterForm.controls['management'].value);
            this.steppers.next();
            this.scrollToTop();
        } else {
            this.stepThreeInvalid = true;
        }
    }


    getContactInfo(val) {
        let contactInfo = [{
            'ofcrfirstname': val.fullfirstName,
            'ofcrlastname': val.fulllastName,
            'ofcrphone': val.phone,
            'ofcrmail': val.managementEmail,
            'ofcrshares': val.shareholdingCapital,
            'memberImage': this.mgmtCeoProfData != '' ? this.mgmtCeoProfData.url : '',
            'position': 'ceo'
        }];

        val.contact_info.forEach((ele,ind) => {
            ele.position = 'officer';
            ele.memberImage = (this.mgmtOfficerProfData.length > 0) ? this.mgmtOfficerProfData[ind].url : '';
            contactInfo.push(ele);
        });
        return contactInfo;
    }
    public nextStepFour(): void {
      this.steppers.next();
   }

   public nextStepFive(): void {
    this.steppers.next();
 }




 isoCountries = [
  {code:'AF' , name: 'Afghanistan'},
  {code:'AX' , name: 'Aland Islands'},
  {code:'AL' , name: 'Albania'},
  {code:'DZ' , name: 'Algeria'},
  {code:'AS' , name: 'American Samoa'},
  {code:'AD' , name: 'Andorra'},
  {code:'AO' , name: 'Angola'},
  {code:'AI' , name: 'Anguilla'},
  {code:'AQ' , name: 'Antarctica'},
  {code:'AG' , name: 'Antigua And Barbuda'},
  {code:'AR' , name: 'Argentina'},
  {code:'AM' , name: 'Armenia'},
  {code:'AW' , name: 'Aruba'},
  {code:'AU' , name: 'Australia'},
  {code:'AT' , name: 'Austria'},
  {code:'AZ' , name: 'Azerbaijan'},
  {code:'BS' , name: 'Bahamas'},
  {code:'BH' , name: 'Bahrain'},
  {code:'BD' , name: 'Bangladesh'},
  {code:'BB' , name: 'Barbados'},
  {code:'BY' , name: 'Belarus'},
  {code:'BE' , name: 'Belgium'},
  {code:'BZ' , name: 'Belize'},
  {code:'BJ' , name: 'Benin'},
  {code:'BM' , name: 'Bermuda'},
  {code:'BT' , name: 'Bhutan'},
  {code:'BO' , name: 'Bolivia'},
  {code:'BA' , name: 'Bosnia And Herzegovina'},
  {code:'BW' , name: 'Botswana'},
  {code:'BV' , name: 'Bouvet Island'},
  {code:'BR' , name: 'Brazil'},
  {code:'IO' , name: 'British Indian Ocean Territory'},
  {code:'BN' , name: 'Brunei Darussalam'},
  {code:'BG' , name: 'Bulgaria'},
  {code:'BF' , name: 'Burkina Faso'},
  {code:'BI' , name: 'Burundi'},
  {code:'KH' , name: 'Cambodia'},
  {code:'CM' , name: 'Cameroon'},
  {code:'CA' , name: 'Canada'},
  {code:'CV' , name: 'Cape Verde'},
  {code:'CYM' , name: 'Cayman Islands'},
  {code:'CF' , name: 'Central African Republic'},
  {code:'TD' , name: 'Chad'},
  {code:'CL' , name: 'Chile'},
  {code:'CN' , name: 'China'},
  {code:'CX' , name: 'Christmas Island'},
  {code:'CC' , name: 'Cocos (Keeling) Islands'},
  {code:'CO' , name: 'Colombia'},
  {code:'KM' , name: 'Comoros'},
  {code:'CG' , name: 'Congo'},
  {code:'CD' , name: 'Congo, Democratic Republic'},
  {code:'CK' , name: 'Cook Islands'},
  {code:'CR' , name: 'Costa Rica'},
  {code:'CIV' , name: 'Cote D\'Ivoire'},
  {code:'HR' , name: 'Croatia'},
  {code:'CU' , name: 'Cuba'},
  {code:'CY' , name: 'Cyprus'},
  {code:'CZ' , name: 'Czech Republic'},
  {code:'DK' , name: 'Denmark'},
  {code:'DJ' , name: 'Djibouti'},
  {code:'DM' , name: 'Dominica'},
  {code:'DO' , name: 'Dominican Republic'},
  {code:'EC' , name: 'Ecuador'},
  {code:'EG' , name: 'Egypt'},
  {code:'SV' , name: 'El Salvador'},
  {code:'GQ' , name: 'Equatorial Guinea'},
  {code:'ER' , name: 'Eritrea'},
  {code:'EE' , name: 'Estonia'},
  {code:'EH' , name: 'Ethiopia'},
  {code:'FK' , name: 'Falkland Islands (Malvinas)'},
  {code:'FO' , name: 'Faroe Islands'},
  {code:'FJ' , name: 'Fiji'},
  {code:'FI' , name: 'Finland'},
  {code:'FR' , name: 'France'},
  {code:'GF' , name: 'French Guiana'},
  {code:'PF' , name: 'French Polynesia'},
  {code:'TF' , name: 'French Southern Territories'},
  {code:'GA' , name: 'Gabon'},
  {code:'GM' , name: 'Gambia'},
  {code:'GE' , name: 'Georgia'},
  {code:'DE' , name: 'Germany'},
  {code:'GH' , name: 'Ghana'},
  {code:'GI' , name: 'Gibraltar'},
  {code:'GR' , name: 'Greece'},
  {code:'GL' , name: 'Greenland'},
  {code:'GD' , name: 'Grenada'},
  {code:'GP' , name: 'Guadeloupe'},
  {code:'GU' , name: 'Guam'},
  {code:'GT' , name: 'Guatemala'},
  {code:'GG' , name: 'Guernsey'},
  {code:'GN' , name: 'Guinea'},
  {code:'GW' , name: 'Guinea-Bissau'},
  {code:'GN' , name: 'Guyana'},
  {code:'HT' , name: 'Haiti'},
  {code:'HM' , name: 'Heard Island & Mcdonald Islands'},
  {code:'VA' , name: 'Holy See (Vatican City State)'},
  {code:'HN' , name: 'Honduras'},
  {code:'HK' , name: 'Hong Kong'},
  {code:'HU' , name: 'Hungary'},
  {code:'IS' , name: 'Iceland'},
  {code:'IN' , name: 'India'},
  {code:'ID' , name: 'Indonesia'},
  {code:'IR' , name: 'Iran, Islamic Republic Of'},
  {code:'IQ' , name: 'Iraq'},
  {code:'IE' , name: 'Ireland'},
  {code:'IM' , name: 'Isle Of Man'},
  {code:'IL' , name: 'Israel'},
  {code:'IT' , name: 'Italy'},
  {code:'JM' , name: 'Jamaica'},
  {code:'JP' , name: 'Japan'},
  {code:'JE' , name: 'Jersey'},
  {code:'JO' , name: 'Jordan'},
  {code:'KZ' , name: 'Kazakhstan'},
  {code:'KE' , name: 'Kenya'},
  {code:'KI' , name: 'Kiribati'},
  {code:'KR' , name: 'Korea'},
  {code:'PR' , name: 'Korea, Republic of'},
  {code:'KW' , name: 'Kuwait'},
  {code:'KG' , name: 'Kyrgyzstan'},
  {code:'LA' , name: 'Lao People\'s Democratic Republic'},
  {code:'LV' , name: 'Latvia'},
  {code:'LB' , name: 'Lebanon'},
  {code:'LS' , name: 'Lesotho'},
  {code:'LR' , name: 'Liberia'},
  {code:'LY' , name: 'Libyan Arab Jamahiriya'},
  {code:'LI' , name: 'Liechtenstein'},
  {code:'LT' , name: 'Lithuania'},
  {code:'LU' , name: 'Luxembourg'},
  {code:'MO' , name: 'Macao'},
  {code:'MK' , name: 'Macedonia'},
  {code:'MG' , name: 'Madagascar'},
  {code:'MW' , name: 'Malawi'},
  {code:'MY' , name: 'Malaysia'},
  {code:'MV' , name: 'Maldives'},
  {code:'ML' , name: 'Mali'},
  {code:'MT' , name: 'Malta'},
  {code:'MH' , name: 'Marshall Islands'},
  {code:'MQ' , name: 'Martinique'},
  {code:'MR' , name: 'Mauritania'},
  {code:'MU' , name: 'Mauritius'},
  {code:'MY' , name: 'Mayotte'},
  {code:'MX' , name: 'Mexico'},
  {code:'FM' , name: 'Micronesia, Federated States Of'},
  {code:'MD' , name: 'Moldova'},
  {code:'MC' , name: 'Monaco'},
  {code:'MN' , name: 'Mongolia'},
  {code:'ME' , name: 'Montenegro'},
  {code:'MS' , name: 'Montserrat'},
  {code:'MA' , name: 'Morocco'},
  {code:'MZ' , name: 'Mozambique'},
  {code:'MM' , name: 'Myanmar'},
  {code:'NA' , name: 'Namibia'},
  {code:'NR' , name: 'Nauru'},
  {code:'NP' , name: 'Nepal'},
  {code:'NL' , name: 'Netherlands'},
  {code:'AN' , name: 'Netherlands Antilles'},
  {code:'NC' , name: 'New Caledonia'},
  {code:'NZ' , name: 'New Zealand'},
  {code:'NI' , name: 'Nicaragua'},
  {code:'NE' , name: 'Niger'},
  {code:'NG' , name: 'Nigeria'},
  {code:'NU' , name: 'Niue'},
  {code:'NF' , name: 'Norfolk Island'},
  {code:'MP' , name: 'Northern Mariana Islands'},
  {code:'NO' , name: 'Norway'},
  {code:'OM' , name: 'Oman'},
  {code:'PK' , name: 'Pakistan'},
  {code:'PW' , name: 'Palau'},
  {code:'PS' , name: 'Palestinian Territory, Occupied'},
  {code:'PA' , name: 'Panama'},
  {code:'PG' , name: 'Papua New Guinea'},
  {code:'PY' , name: 'Paraguay'},
  {code:'PE' , name: 'Peru'},
  {code:'PH' , name: 'Philippines'},
  {code:'PN' , name: 'Pitcairn'},
  {code:'PO' , name: 'Poland'},
  {code:'PT' , name: 'Portugal'},
  {code:'PR' , name: 'Puerto Rico'},
  {code:'QA' , name: 'Qatar'},
  {code:'RE' , name: 'Reunion'},
  {code:'RO' , name: 'Romania'},
  {code:'RU' , name: 'Russian Federation'},
  {code:'RW' , name: 'Rwanda'},
  {code:'BL' , name: 'Saint Barthelemy'},
  {code:'SH' , name: 'Saint Helena'},
  {code:'KN' , name: 'Saint Kitts And Nevis'},
  {code:'LC' , name: 'Saint Lucia'},
  {code:'MF' , name: 'Saint Martin'},
  {code:'PM' , name: 'Saint Pierre And Miquelon'},
  {code:'VC' , name: 'Saint Vincent And Grenadines'},
  {code:'WS' , name: 'Samoa'},
  {code:'SM' , name: 'San Marino'},
  {code:'ST' , name: 'Sao Tome And Principe'},
  {code:'SA' , name: 'Saudi Arabia'},
  {code:'SN' , name: 'Senegal'},
  {code:'RS' , name: 'Serbia'},
  {code:'SC' , name: 'Seychelles'},
  {code:'SL' , name: 'Sierra Leone'},
  {code:'SG' , name: 'Singapore'},
  {code:'SI' , name: 'Slovakia'},
  {code:'SN' , name: 'Slovenia'},
  {code:'SB' , name: 'Solomon Islands'},
  {code:'SO' , name: 'Somalia'},
  {code:'ZA' , name: 'South Africa'},
  {code:'GS' , name: 'South Georgia And Sandwich Isl.'},
  {code:'ES' , name: 'Spain'},
  {code:'LK' , name: 'Sri Lanka'},
  {code:'SD' , name: 'Sudan'},
  {code:'SR' , name: 'Suriname'},
  {code:'SJ' , name: 'Svalbard And Jan Mayen'},
  {code:'SZ' , name: 'Swaziland'},
  {code:'SE' , name: 'Sweden'},
  {code:'CH' , name: 'Switzerland'},
  {code:'SY' , name: 'Syrian Arab Republic'},
  {code:'TW' , name: 'Taiwan'},
  {code:'TJ' , name: 'Tajikistan'},
  {code:'TZ' , name: 'Tanzania'},
  {code:'TH' , name: 'Thailand'},
  {code:'TL' , name: 'Timor-Leste'},
  {code:'TG' , name: 'Togo'},
  {code:'TK' , name: 'Tokelau'},
  {code:'TO' , name: 'Tonga'},
  {code:'TT' , name: 'Trinidad And Tobago'},
  {code:'TN' , name: 'Tunisia'},
  {code:'TR' , name: 'Turkey'},
  {code:'TM' , name: 'Turkmenistan'},
  {code:'TC' , name: 'Turks And Caicos Islands'},
  {code:'TV' , name: 'Tuvalu'},
  {code:'UG' , name: 'Uganda'},
  {code:'UA' , name: 'Ukraine'},
  {code:'AE' , name: 'United Arab Emirates'},
  {code:'GB' , name: 'United Kingdom'},
  {code:'US' , name: 'United States'},
  {code:'UM' , name: 'United States Outlying Islands'},
  {code:'UY' , name: 'Uruguay'},
  {code:'UZ' , name: 'Uzbekistan'},
  {code:'VU' , name: 'Vanuatu'},
  { code: 'VE' , name: 'Venezuela'},
  { code: 'VN' , name: 'Viet Nam'},
  { code: 'VG' , name: 'Virgin Islands, British'},
  { code: 'VI' , name: 'Virgin Islands, U.S.'},
  { code: 'WF' , name: 'Wallis And Futuna'},
  { code: 'EH' , name: 'Western Sahara'},
  { code: 'YE' , name: 'Yemen'},
  { code: 'ZM' , name: 'Zambia'},
  { code: 'ZW' , name: 'Zimbabwe'}
];


    countryCode = [
        {code:'93' , name: 'Afghanistan'},
        {code:'358' , name: 'Aland Islands'},
        {code:'355' , name: 'Albania'},
        {code:'213' , name: 'Algeria'},
        {code:'684' , name: 'American Samoa'},
        {code:'376' , name: 'Andorra'},
        {code:'244' , name: 'Angola'},
        {code:'1' , name: 'Anguilla'},
        {code:'672' , name: 'Antarctica'},
        {code:'1' , name: 'Antigua And Barbuda'},
        {code:'54' , name: 'Argentina'},
        {code:'374' , name: 'Armenia'},
        {code:'297' , name: 'Aruba'},
        {code:'61' , name: 'Australia'},
        {code:'43' , name: 'Austria'},
        {code:'994' , name: 'Azerbaijan'},
        {code:'1' , name: 'Bahamas'},
        {code:'973' , name: 'Bahrain'},
        {code:'880' , name: 'Bangladesh'},
        {code:'1' , name: 'Barbados'},
        {code:'375' , name: 'Belarus'},
        {code:'32' , name: 'Belgium'},
        {code:'501' , name: 'Belize'},
        {code:'229' , name: 'Benin'},
        {code:'1' , name: 'Bermuda'},
        {code:'975' , name: 'Bhutan'},
        {code:'591' , name: 'Bolivia'},
        {code:'387' , name: 'Bosnia And Herzegovina'},
        {code:'267' , name: 'Botswana'},
        {code:'011' , name: 'Bouvet Island'},
        {code:'55' , name: 'Brazil'},
        {code:'1' , name: 'British Indian Ocean Territory'},
        {code:'673' , name: 'Brunei Darussalam'},
        {code:'359' , name: 'Bulgaria'},
        {code:'226' , name: 'Burkina Faso'},
        {code:'257' , name: 'Burundi'},
        {code:'855' , name: 'Cambodia'},
        {code:'237' , name: 'Cameroon'},
        {code:'1' , name: 'Canada'},
        {code:'238' , name: 'Cape Verde'},
        {code:'1' , name: 'Cayman Islands'},
        {code:'236' , name: 'Central African Republic'},
        {code:'235' , name: 'Chad'},
        {code:'56' , name: 'Chile'},
        {code:'86' , name: 'China'},
        {code:'61' , name: 'Christmas Island'},
        {code:'891' , name: 'Cocos (Keeling) Islands'},
        {code:'57' , name: 'Colombia'},
        {code:'269' , name: 'Comoros'},
        {code:'242' , name: 'Congo'},
        {code:'242' , name: 'Congo, Democratic Republic'},
        {code:'682' , name: 'Cook Islands'},
        {code:'506' , name: 'Costa Rica'},
        {code:'225' , name: 'Cote D\'Ivoire'},
        {code:'385' , name: 'Croatia'},
        {code:'53' , name: 'Cuba'},
        {code:'357' , name: 'Cyprus'},
        {code:'420' , name: 'Czech Republic'},
        {code:'45' , name: 'Denmark'},
        {code:'253' , name: 'Djibouti'},
        {code:'1' , name: 'Dominica'},
        {code:'1' , name: 'Dominican Republic'},
        {code:'593' , name: 'Ecuador'},
        {code:'20' , name: 'Egypt'},
        {code:'503' , name: 'El Salvador'},
        {code:'240' , name: 'Equatorial Guinea'},
        {code:'291' , name: 'Eritrea'},
        {code:'372' , name: 'Estonia'},
        {code:'251' , name: 'Ethiopia'},
        {code:'500' , name: 'Falkland Islands (Malvinas)'},
        {code:'298' , name: 'Faroe Islands'},
        {code:'679' , name: 'Fiji'},
        {code:'358' , name: 'Finland'},
        {code:'33' , name: 'France'},
        {code:'594' , name: 'French Guiana'},
        {code:'689' , name: 'French Polynesia'},
        {code:'262' , name: 'French Southern Territories'},
        {code:'241' , name: 'Gabon'},
        {code:'220' , name: 'Gambia'},
        {code:'995' , name: 'Georgia'},
        {code:'49' , name: 'Germany'},
        {code:'233' , name: 'Ghana'},
        {code:'350' , name: 'Gibraltar'},
        {code:'30' , name: 'Greece'},
        {code:'299' , name: 'Greenland'},
        {code:'1' , name: 'Grenada'},
        {code:'590' , name: 'Guadeloupe'},
        {code:'1' , name: 'Guam'},
        {code:'502' , name: 'Guatemala'},
        {code:'44' , name: 'Guernsey'},
        {code:'224' , name: 'Guinea'},
        {code:'245' , name: 'Guinea-Bissau'},
        {code:'592' , name: 'Guyana'},
        {code:'509' , name: 'Haiti'},
        {code:'0' , name: 'Heard Island & Mcdonald Islands'},
        {code:'379' , name: 'Holy See (Vatican City State)'},
        {code:'504' , name: 'Honduras'},
        {code:'852' , name: 'Hong Kong'},
        {code:'36' , name: 'Hungary'},
        {code:'354' , name: 'Iceland'},
        {code:'91' , name: 'India'},
        {code:'62' , name: 'Indonesia'},
        {code:'98' , name: 'Iran, Islamic Republic Of'},
        {code:'964' , name: 'Iraq'},
        {code:'353' , name: 'Ireland'},
        {code:'44' , name: 'Isle Of Man'},
        {code:'972' , name: 'Israel'},
        {code:'39' , name: 'Italy'},
        {code:'1' , name: 'Jamaica'},
        {code:'81' , name: 'Japan'},
        {code:'44' , name: 'Jersey'},
        {code:'962' , name: 'Jordan'},
        {code:'7' , name: 'Kazakhstan'},
        {code:'254' , name: 'Kenya'},
        {code:'686' , name: 'Kiribati'},
        {code:'82' , name: 'Korea'},
        {code:'82' , name: 'Korea, Republic of'},
        {code:'965' , name: 'Kuwait'},
        {code:'996' , name: 'Kyrgyzstan'},
        {code:'856' , name: 'Lao People\'s Democratic Republic'},
        {code:'371' , name: 'Latvia'},
        {code:'961' , name: 'Lebanon'},
        {code:'266' , name: 'Lesotho'},
        {code:'231' , name: 'Liberia'},
        {code:'218' , name: 'Libyan Arab Jamahiriya'},
        {code:'423' , name: 'Liechtenstein'},
        {code:'370' , name: 'Lithuania'},
        {code:'352' , name: 'Luxembourg'},
        {code:'853' , name: 'Macao'},
        {code:'389' , name: 'Macedonia'},
        {code:'261' , name: 'Madagascar'},
        {code:'265' , name: 'Malawi'},
        {code:'60' , name: 'Malaysia'},
        {code:'960' , name: 'Maldives'},
        {code:'223' , name: 'Mali'},
        {code:'356' , name: 'Malta'},
        {code:'692' , name: 'Marshall Islands'},
        {code:'596' , name: 'Martinique'},
        {code:'222' , name: 'Mauritania'},
        {code:'230' , name: 'Mauritius'},
        {code:'269' , name: 'Mayotte'},
        {code:'52' , name: 'Mexico'},
        {code:'691' , name: 'Micronesia, Federated States Of'},
        {code:'373' , name: 'Moldova'},
        {code:'377' , name: 'Monaco'},
        {code:'976' , name: 'Mongolia'},
        {code:'382' , name: 'Montenegro'},
        {code:'1' , name: 'Montserrat'},
        {code:'212' , name: 'Morocco'},
        {code:'258' , name: 'Mozambique'},
        {code:'95' , name: 'Myanmar'},
        {code:'264' , name: 'Namibia'},
        {code:'674' , name: 'Nauru'},
        {code:'977' , name: 'Nepal'},
        {code:'31' , name: 'Netherlands'},
        {code:'599' , name: 'Netherlands Antilles'},
        {code:'687' , name: 'New Caledonia'},
        {code:'64' , name: 'New Zealand'},
        {code:'505' , name: 'Nicaragua'},
        {code:'227' , name: 'Niger'},
        {code:'234' , name: 'Nigeria'},
        {code:'683' , name: 'Niue'},
        {code:'672' , name: 'Norfolk Island'},
        {code:'1' , name: 'Northern Mariana Islands'},
        {code:'47' , name: 'Norway'},
        {code:'968' , name: 'Oman'},
        {code:'92' , name: 'Pakistan'},
        {code:'680' , name: 'Palau'},
        {code:'970' , name: 'Palestinian Territory, Occupied'},
        {code:'507' , name: 'Panama'},
        {code:'675' , name: 'Papua New Guinea'},
        {code:'595' , name: 'Paraguay'},
        {code:'51' , name: 'Peru'},
        {code:'63' , name: 'Philippines'},
        {code:'64' , name: 'Pitcairn'},
        {code:'48' , name: 'Poland'},
        {code:'351' , name: 'Portugal'},
        {code:'1' , name: 'Puerto Rico'},
        {code:'974' , name: 'Qatar'},
        {code:'262' , name: 'Reunion'},
        {code:'40' , name: 'Romania'},
        {code:'7' , name: 'Russian Federation'},
        {code:'250' , name: 'Rwanda'},
        {code:'590' , name: 'Saint Barthelemy'},
        {code:'290' , name: 'Saint Helena'},
        {code:'1' , name: 'Saint Kitts And Nevis'},
        {code:'1' , name: 'Saint Lucia'},
        {code:'1' , name: 'Saint Martin'},
        {code:'508' , name: 'Saint Pierre And Miquelon'},
        {code:'1' , name: 'Saint Vincent And Grenadines'},
        {code:'685' , name: 'Samoa'},
        {code:'378' , name: 'San Marino'},
        {code:'239' , name: 'Sao Tome And Principe'},
        {code:'966' , name: 'Saudi Arabia'},
        {code:'221' , name: 'Senegal'},
        {code:'381' , name: 'Serbia'},
        {code:'248' , name: 'Seychelles'},
        {code:'232' , name: 'Sierra Leone'},
        {code:'65' , name: 'Singapore'},
        {code:'421' , name: 'Slovakia'},
        {code:'386' , name: 'Slovenia'},
        {code:'677' , name: 'Solomon Islands'},
        {code:'252' , name: 'Somalia'},
        {code:'27' , name: 'South Africa'},
        {code:'500' , name: 'South Georgia And Sandwich Isl.'},
        {code:'34' , name: 'Spain'},
        {code:'94' , name: 'Sri Lanka'},
        {code:'249' , name: 'Sudan'},
        {code:'597' , name: 'Suriname'},
        {code:'47' , name: 'Svalbard And Jan Mayen'},
        {code:'268' , name: 'Swaziland'},
        {code:'46' , name: 'Sweden'},
        {code:'41' , name: 'Switzerland'},
        {code:'963' , name: 'Syrian Arab Republic'},
        {code:'886' , name: 'Taiwan'},
        {code:'992' , name: 'Tajikistan'},
        {code:'225' , name: 'Tanzania'},
        {code:'66' , name: 'Thailand'},
        {code:'670' , name: 'Timor-Leste'},
        {code:'228' , name: 'Togo'},
        {code:'690' , name: 'Tokelau'},
        {code:'676' , name: 'Tonga'},
        {code:'1' , name: 'Trinidad And Tobago'},
        {code:'216' , name: 'Tunisia'},
        {code:'90' , name: 'Turkey'},
        {code:'993' , name: 'Turkmenistan'},
        {code:'1' , name: 'Turks And Caicos Islands'},
        {code:'688' , name: 'Tuvalu'},
        {code:'256' , name: 'Uganda'},
        {code:'380' , name: 'Ukraine'},
        {code:'971' , name: 'United Arab Emirates'},
        {code:'44' , name: 'United Kingdom'},
        {code:'1' , name: 'United States'},
        {code:'1' , name: 'United States Outlying Islands'},
        {code:'598' , name: 'Uruguay'},
        {code:'998' , name: 'Uzbekistan'},
        {code:'678' , name: 'Vanuatu'},
        { code: '58' , name: 'Venezuela'},
        { code: '84' , name: 'Viet Nam'},
        { code: '1' , name: 'Virgin Islands, British'},
        { code: '1' , name: 'Virgin Islands, U.S.'},
        { code: '681' , name: 'Wallis And Futuna'},
        { code: '212' , name: 'Western Sahara'},
        { code: '967' , name: 'Yemen'},
        { code: '260' , name: 'Zambia'},
        { code: '263' , name: 'Zimbabwe'}
    ];



    business = [
            {val:'1',name:'Accommodation, Food Services & Drinking Places'},
            {val:'2',name:'Administration & Support and Waste Management and Remediation Services'},
            {val:'3',name:'Agriculture, Forestry, Hunting & Fishing'},
            {val:'4',name:'Arts, Entertainment & Recreation'},
            {val:'5',name:'Construction of Buildings'},
            {val:'6',name:'Educational Services'},
            {val:'7',name:'Finance & Insurance'},
            {val:'8',name:'Health Care & Social Assistance'},
            {val:'9',name:'Information'},
            {val:'10',name:'Manufacturing'},
            {val:'11',name:'Mining'},
            {val:'12',name:'Other Services'},
            {val:'13',name:'Professional, Scientific & Technical Services'},
            {val:'14',name:'Real Estate & Rental & Leasing'},
            {val:'15',name:'Religious, Grantmaking, Civic, Professional & Similar Organizations'},
            {val:'16',name:'Retail Trade'},
            {val:'17',name:'Transportation & Warehousing'},
            {val:'18',name:'Utilities'},
            {val:'19',name:'Wholesale Trade'}
    ];

month=[
            {val:'1',name:'January'},
            {val:'2',name:'Febraury'},
            {val:'3',name:'March'},
            {val:'4',name:'April'},
            {val:'5',name:'May'},
            {val:'6',name:'June'},
            {val:'7',name:'July'},
            {val:'8',name:'August'},
            {val:'9',name:'September'},
            {val:'10',name:'October'},
            {val:'11',name:'November'},
            {val:'12',name:'December'}
];

day=[
            {val:'1',name:'1'},
            {val:'2',name:'2'},
            {val:'3',name:'3'},
            {val:'4',name:'4'},
            {val:'5',name:'5'},
            {val:'6',name:'6'},
            {val:'7',name:'7'},
            {val:'8',name:'8'},
            {val:'9',name:'9'},
            {val:'10',name:'10'},
            {val:'11',name:'11'},
            {val:'12',name:'12'},
            {val:'13',name:'13'},
            {val:'14',name:'14'},
            {val:'15',name:'15'},
            {val:'16',name:'16'},
            {val:'17',name:'17'},
            {val:'18',name:'18'},
            {val:'19',name:'19'},
            {val:'20',name:'20'},
            {val:'21',name:'21'},
            {val:'22',name:'22'},
            {val:'23',name:'23'},
            {val:'24',name:'24'},
            {val:'25',name:'25'},
            {val:'26',name:'26'},
            {val:'27',name:'27'},
            {val:'28',name:'28'},
            {val:'29',name:'29'},
            {val:'30',name:'30'},
            {val:'31',name:'31'}
];


year=[
    {val:'2018',name:'2018'},
    {val:'2019',name:'2019'},
    {val:'2020',name:'2020'},
    {val:'2021',name:'2021'},
    {val:'2022',name:'2022'},
    {val:'2023',name:'2023'},
    {val:'2024',name:'2024'},
    {val:'2025',name:'2025'},
    {val:'2026',name:'2026'},
    {val:'2027',name:'2027'},
    {val:'2028',name:'2028'},
    {val:'2029',name:'2029'},
    {val:'2030',name:'2030'},
    {val:'2031',name:'2031'},
    {val:'2032',name:'2032'},
    {val:'2033',name:'2033'},
    {val:'2034',name:'2034'},
    {val:'2035',name:'2035'},
    {val:'2036',name:'2036'},
    {val:'2037',name:'2037'},
    {val:'2038',name:'2038'},
    {val:'2039',name:'2039'},
    {val:'2040',name:'2040'},
    {val:'2041',name:'2041'},
    {val:'2042',name:'2042'},
    {val:'2043',name:'2043'},
    {val:'2044',name:'2044'},
    {val:'2045',name:'2045'},
    {val:'2046',name:'2046'},
    {val:'2047',name:'2047'},
    {val:'2048',name:'2048'},
    {val:'2049',name:'2049'},
    {val:'2050',name:'2050'}

]
}

