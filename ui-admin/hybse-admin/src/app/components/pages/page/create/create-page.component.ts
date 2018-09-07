import { Component, OnInit, Input } from '@angular/core';
import { fadeInDown } from 'ng-animate';
import { trigger, transition, useAnimation } from '@angular/animations';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { BlurInputErrorMatcher } from '../../../../modules/material/material.errror';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from "rxjs/observable/forkJoin";


declare var CKEDITOR:any;
declare var tinyMCE:any;
@Component({
  selector: 'hybse-admin-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation( fadeInDown,{
      params: {
        timing: 1,
        a: '-10px'
      }
    }))])
  ],
})
export class CreatePageComponent implements OnInit {

  constructor(private _fb:FormBuilder,
    private _urls: ApiurlsService,
    private _utils: UtilityService,
    private _req: ApirequestService,
    private route: ActivatedRoute,
    private router: Router ) { }
  fadeInDown:any;
  editorValue:any = '';
  editorPlugins:string = 'print preview powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount tinymcespellchecker a11ychecker imagetools mediaembed  linkchecker contextmenu colorpicker textpattern help';
  blurMatcher = new BlurInputErrorMatcher();
  showLoader:boolean = false;
  createPageForm:FormGroup;
  contentLanguage:string = 'en-gb';
  langContent:any = {
    eng: '',
    german: ''
  }
  formResponseMsg:string = '';
  alertStatusMessage:boolean = false;
  @Input() actionType:string = 'add';
  pageAlias:string = '';
  pageId:any;

  createPageFormInit() {
    this.createPageForm = this._fb.group({
      'page_title': ['',[Validators.required]],
      'page_alias': ['',[Validators.required]],
      'page_cat': ['',[Validators.required]],
      'page_content_en': ['',[Validators.required]],
      'page_content_german': [''],
      'page_meta_grp': this._fb.group({
        'meta_title': [''],
        'meta_keys': [''],
        'meta_description': ['']
      })
    });
  }


  pageCatList:any = [];
  getpageCatList() {
    this._req.fetchApiData(this._urls.pageCatListUrl,{}).subscribe(
      (data:any) => {
        let resSucc = data.data;
        let resErr = data.error;
        console.log('resSucc',resSucc);
        if(resSucc != '') this.pageCatList = resSucc;
      },
      error => {
      },
      () => {
      }
    );
  }

  setAliasInput() {
    let formVal = this.createPageForm.value;
    let title = formVal.page_title
    if( title != '') {
      let alias = title.replace(/\s+/g, '-').toLowerCase();
      this.createPageForm.controls['page_alias'].setValue(alias);
    }
  }


  createUpdatePage() {
    if(this.createPageForm.valid) {
      let formVal = this.createPageForm.value;
      let data:any = {
        idCategory: formVal.page_cat,
        alias: formVal.page_alias,
        title: formVal.page_title,
        body: formVal.page_content_en,
        language: this.contentLanguage,
        metaTags: formVal.page_meta_grp.meta_keys,
        metaDescription: formVal.page_meta_grp.meta_description
      };
      let url = (this.actionType == 'edit') ? this._urls.pageUpdateUrl : this._urls.pageCreateUrl;
      if(this.actionType == 'edit') data.id = this.pageId;
      ( this.langContent.german != '' ) ? this.multipleReq(url,data) : this.sendPageData(url,data);
    }
  }


  checkLangChange() {

  }





  sendPageData(url,data) {
    this._req.fetchApiData(url,data).subscribe(
      (data:any) => {
        console.log('data',data);
        this.handleSubmitData(data.data);
        this.handleSubmitError(data.error);
      },
      error => {

      },
      () => {

      }
    );
  }

  multipleReq(url,data) {
    let engReq = this._req.fetchApiData(url,data);
    let gerData = {...data};
    gerData.body = this.langContent.german;
    gerData.language = 'de';
    let gerReq = this._req.fetchApiData(url,gerData);
    forkJoin([engReq,gerReq]).subscribe(
      (data:any) => {
        console.log(data);
        this.handleSubmitData(data[0].data);
        this.handleSubmitError(data[0].error);
      },
      error => {

      },
      () => {

      }
    );
  }

  handleSubmitData( data ) {
    console.log('submitted',data);
    this._utils.scrollToY(0,400,'easeInOutQuint');
    if(data != '') {
      this.formResponseMsg = (this.actionType == 'edit' ) ? 'Page has been updated Successfully' : 'Page has been created Successfully';
      this.alertStatusMessage = true;
      setTimeout(()=> {
        this.router.navigate(['/page/lists']);
      },2000);
    }
  }

  handleSubmitError(error) {
    if(error != '') {
      this._utils.scrollToY(0,400,'easeInOutQuint');
      this.formResponseMsg = error['Error Msg'];
      this.alertStatusMessage = false;
    }
  }



  getPageData() {
    if(this.pageAlias != '') {
      let data = { alias: this.pageAlias };
      console.log(data);
      this._req.fetchApiData(this._urls.getpageUrl,data).subscribe(
        (data:any) => {
          console.log('GetData',data);
          let resSucc = data.data;
          this.showLoader = false;
          this.setPageData(resSucc);
        }
      )
    }
  }


  setPageData(data) {
    let content = data[0];
    let germanContent = data[1] != undefined ? data[1].body : '';
    this.setLanguages(data);
    this.pageId = data[0].id;
    setTimeout(()=>{
      this.createPageForm.patchValue({
        page_title: content.title,
        page_alias: content.alias,
        page_cat : content.idCategory,
        page_content_en: this.langContent.eng,
        page_content_german: this.langContent.german,
        page_meta_grp: {
          meta_title: '',
          meta_keys: content.metaTags,
          meta_description: content.metaDescription
        }
      });
    },500)
    this.setEditorContent('engContent',this.langContent.eng);
  }

  setLanguages(data) {
    data.forEach(ele => {
      switch (ele.language) {
        case 'en':
        case 'en-gb':
          this.langContent.eng = ele.body;
          break;
        case 'de':
          this.langContent.german = ele.body;
          break;
        default:
          break;
      }
    });

  }

  tinyEditorInit(selector) {
    let seed = this;
    tinyMCE.init({
      selector: selector,
      plugins: this.editorPlugins,
      height : "380",
      init_instance_callback: function (editor) {
        editor.on('blur', function (e) {
          seed.editorBlurEvent(e, editor.getContent());
        });
      }
    });
  }

  setEditorContent(selector,content) {
    tinyMCE.get(selector).setContent(content);
  }

  editorStatus:any = { engEditor: false, germanEditor: false };
  editorBlurEvent(e,content) {
    if(e.target.id == 'engContent') {
      if(content != '') {
        this.langContent.eng = content;
        this.createPageForm.controls['page_content_en'].setValue(content);
        this.editorStatus.engEditor = false;
      } else {
        this.editorStatus.engEditor = true;
      }
    } else {
      if(content != '') {
        this.langContent.german = content;
        this.createPageForm.controls['page_content_german'].setValue(content);
        this.editorStatus.germanEditor = false;
      } else {
        this.editorStatus.germanEditor = true;
      }
    }
  }

  reInitTinyEditor(selector) {
    tinyMCE.EditorManager.execCommand('mceRemoveEditor', true, selector);
    tinyMCE.EditorManager.execCommand('mceAddEditor', true, selector);
  }


  cancelPageCreate() {
    this.router.navigate(['/page/lists']);
  }

  getActionType() {
    if(this.actionType == 'edit') {
      this.showLoader = true;
    }
  }
  ngOnInit() {
    setTimeout(()=>{
      this.tinyEditorInit('#engContent');
    } ,0);
    this.createPageFormInit();
    this.getpageCatList();
    this.route.params.subscribe(
      params => {
        this.pageAlias = params.id;
        if(this.actionType == 'edit') this.getPageData();
      }
    );
  }

  onTabSwitch($ev) {
    ( $ev.index == 0 ) ? this.reInitTinyEditor('engContent') : this.reInitTinyEditor('germanContent');
    this.setEditorContent('germanContent',this.langContent.german);
  }

  ngOnChanges() {
    this.getActionType();
  }

  ngOnDestroy() {
    tinyMCE.EditorManager.execCommand('mceRemoveEditor', true, 'engContent');
  }
}
