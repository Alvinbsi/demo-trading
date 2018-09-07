import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'ng-animate';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../../../../services/utilities/utilities.services';

@Component({
  selector: 'hybse-admin-create-templates',
  templateUrl: './create-templates.component.html',
  styleUrls: ['./create-templates.component.css'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation( fadeInDown,{
      params: {
        timing: 1,
        a: '-10px'
      }
    }))])
  ]
})
export class CreateTemplatesComponent implements OnInit {

  constructor(private _fb:FormBuilder,
    private _req:ApirequestService,
    private _urls:ApiurlsService,
    private router: Router,
    private _utils: UtilityService,
    private route:ActivatedRoute,
    private _dom:DomSanitizer
  ) { }
  createTemplateForm:FormGroup;
  fadeInDown:any;
  allLocaleList:any = [];
  formResponseMsg:string = '';
  alertStatusMessage:boolean = false;
  showLoader:boolean = false;
  messageTemplateId:any = '';
  @Input() actionType:string = 'add';

  editorsOptions: Object = {
    placeholderText: 'Create your Mail Template here',
    charCounterCount: false,
    height: 450
  }

  getActionType() {
    if(this.actionType == 'edit') this.showLoader = true;
  }

  createTemplateFormInit() {
    this.createTemplateForm = this._fb.group({
        'title': ['', [Validators.required] ],
        'locale': ['', [Validators.required] ],
        'messageType': ['', [Validators.required] ],
        'mailContent': ['', [Validators.required]]
    });
  }

  createUpdateTemplate() {
    if(this.createTemplateForm.valid) {
      this.showLoader = true;
      let formVal = this.createTemplateForm.value;
      let data:any = {
        idLocale : formVal.locale,
        parent : 1,
        childId : 1,
        templateId : 1,
        messageType : formVal.messageType, //Internal or External
        title : formVal.title,
        body : formVal.mailContent
      };
      let url = (this.actionType == 'edit') ? this._urls.updateMessageTemplateUrl : this._urls.createMessageTemplateUrl;
      if(this.actionType == 'edit') data.idMessageTemplate = this.messageTemplateId;
      // ( this.langContent.german != '' ) ? this.multipleReq(url,data) : this.sendPageData(url,data);
      this._req.fetchApiData(url,data,'post').subscribe(
        (data:any) => {
          console.log('template',data);
          let resSucc = data.data;
          let resErr = data.error;
          this._utils.scrollToY(0,400,'easeInOutQuint');
          this.showLoader = false;
          if(resSucc != '') {
            this.alertStatusMessage = true;
            this.formResponseMsg = resSucc['Success Description'];
            setTimeout(()=>{
              this.cancelTemplateCreate();
            },2000);
          }
          if(resErr != '') {

          }
        },
        error => {

        },
        () => {

        }
      )
    }
  }

  cancelTemplateCreate() {
    this.router.navigate(['/mail-template/list']);
  }


  getLocaleList() { // Make it common
    this._req.fetchApiData(this._urls.listLocaleUrl,{}).subscribe(
      (data:any) => {
        let response = data.data;
        if(response.length != 0 ) {
          this.allLocaleList = response;
        }
      },
      error => {

      },
      () => {

      }
    );
  }


  gettemplateData() {
    let data = {
      idMessageTemplate: this.messageTemplateId
    }
    this._req.fetchApiData(this._urls.getTemplateByIdUrl,data,'post').subscribe(
      (data:any) => {
        let resSucc = data.data;
        console.log('update',resSucc);
        if(resSucc != '') this.setTemplateData(resSucc);
      }
    )
  }

  setTemplateData(data) {
    let value = data[0];
    this.showLoader = false;
    this.createTemplateForm.patchValue({
      'title': value.title,
      'locale': value.idLocale.toString(),
      'messageType': value.messageType,
      'mailContent': value.body
    });
  }



  ngOnInit() {
    this.createTemplateFormInit();
    this.getLocaleList();
    this.route.params.subscribe(
      params => {
        this.messageTemplateId = params.id;
        this.gettemplateData();
      }
    )
  }

  ngOnChanges() {
    this.getActionType();
  }

}
