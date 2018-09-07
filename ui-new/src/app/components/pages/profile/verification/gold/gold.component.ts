import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../../../services/utilities/utilities.services';
import { ApiurlsService } from '../../../../../services/api-urls/apiurls.service';
import { ApiDataServices } from '../../../../../services/apiservices/api.services';
import { ApirequestService } from '../../../../../services/apirequest/apirequest.service';
import { StorageService } from '../../../../../services/localstorage/storage.service';
import { fsKey } from '../../../../../config/hybse.config';


declare var Cropper:any;
  declare var filestack:any;
  declare var filepicker:any;


@Component({
  selector: 'hybse-gold',
  templateUrl: './gold.component.html',
  styleUrls: ['./gold.component.css']
})



export class GoldComponent implements OnInit {

  constructor( private _utils: UtilityService, private _fb:FormBuilder, private _urls:ApiurlsService,    private _req: ApirequestService,    private _lstore: StorageService ) { }

  goldFormRegister:FormGroup;
  isGold:boolean = false;

  goldFormValidate:boolean=false;
  responseSuccess:boolean = false;
  disableButton:boolean = false;
  showLoader:boolean = false;
  idUser:any;
  registerComplete:boolean = false;


  

  goldFormRegisterInit(){
                this.goldFormRegister = this._fb.group({
                        'supportDocType': ['',[Validators.required]],
                },
                
                { updateOn: 'blur' });
                }
                  
  goldFormSubmit(){
   
    let formVal = this.goldFormRegister.value;
    let documentInfo = this.getDocumentDetails();

    this.goldFormValidate = true;
    if (this.goldFormRegister.valid) {
      this.showLoader = true;
      this.disableButton = true;
    this.idUser = this._lstore.getLocalItems('user');

                      let data = {
                                         idUser: this.idUser,
                                         supportDocType : formVal.supportDocType ,
                                         documentInfo : this.getDocumentDetails()

                                 };
                                 this._req.fetchApiData(this._urls.upgradeGoldUrl,data).subscribe(
                                  (data:any) => {
                                    //  console.log('upgrade',data);
                                     this.isGold = true;
                                     let response = data.data;
                                  },
                                  error => {
                            
                                  },
                                  () => {
                            
                                  })

                                }   
  }

   supportType:any;
  getDocumentDetails() {
    let formVal = this.goldFormRegister.value;
    this.supportType =  formVal.supportDocType;
    let files = [];
     {
      files.push({
        docTitle: 'Proof of funds',
        docName: this.fileUploadUrl,
        docType: 'POF'
      })
    }
     {
        switch (this.supportType)
        {
            case 'POFS1':
            {
              files.push({
                docTitle: 'Custody statements',
                docName: this.fileSupportUrl,
                docType: 'POFS1'
              })
            }
            break;

            case 'POFS2':
            {
              files.push({
                docTitle: 'real estate ownership',
                docName: this.fileSupportUrl,
                docType: 'POFS2'
              })
            }
            break;

            case 'POFS3':
            {
              files.push({
                docTitle: 'account statement',
                docName: this.fileSupportUrl,
                docType: 'POFS3'
              })
            }
            break;

        }
      
    }

    return files;
  }

  scrollToTop() {
    this._utils.scrollToY(0,400,'easeInOutQuint');
  }

  fileUploadResponse:any;
  fileUploadUrl:any;
  fileName:any;
  fsFileUpload() {
    let fsClient = filestack.init(fsKey);
    let fileAccepted = [".pdf",".doc",".docx",".docm","image/*"];
    let maxSize = 10485760;
    
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
      this.fileUploadResponse = response.filesUploaded[0];
      this.fileUploadUrl = this.fileUploadResponse.url;
      this.fileName = this.fileUploadResponse.filename;
      // console.log(this.fileUploadUrl);
    });
  }


  fileSupportResponse:any;
  fileSupportUrl:any;
  fileSupportName:any;
  
  fsSupportUpload() {
    let fsClient = filestack.init(fsKey);
    let fileAccepted = [".pdf",".doc",".docx",".docm","image/*"];
    let maxSize = 10485760;
    
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
      this.fileSupportResponse = response.filesUploaded[0];
      this.fileSupportUrl = this.fileSupportResponse.url;
      this.fileSupportName = this.fileSupportResponse.filename;
      // console.log(this.fileSupportUrl);
    });
  }


  ngOnInit() {
    this.scrollToTop();
    this.goldFormRegisterInit();
    this.fileName="";
    this.fileSupportName="";
    
  }

}
