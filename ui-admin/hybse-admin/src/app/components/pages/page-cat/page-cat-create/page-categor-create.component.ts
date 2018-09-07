import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BlurInputErrorMatcher } from '../../../../modules/material/material.errror';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hybse-admin-page-categor-create',
  templateUrl: './page-categor-create.component.html',
  styleUrls: ['./page-categor-create.component.css']
})
export class PageCategorCreateComponent implements OnInit {

  constructor(private _fb:FormBuilder,
    private _utils: UtilityService,
    private _url:ApiurlsService,
    private _req: ApirequestService,
    private router: Router,
    private route:ActivatedRoute ) { }
  fadeInDown:any;
  blurMatcher = new BlurInputErrorMatcher();
  showLoader:boolean = false;
  formResponseMsg:string = '';
  alertStatusMessage:boolean;
  createPageCatForm:FormGroup;
  catId:any = '';
  @Input() actionType:any = 'add';


  createPageFormInit() {
    this.createPageCatForm = this._fb.group({
      'page_cat_title': ['',[Validators.required]],
      'page_cat_alias': ['',[ Validators.required ]],
      'page_cat_desc': ['',[Validators.required]]
    });
  }

  createUpdatePageCat() {
    if(this.createPageCatForm.valid) {
      this.showLoader= true;
      let formVal = this.createPageCatForm.value;
      let url = this._url.pageCatCreateUrl;
      let data:any = {
        categoryName: formVal.page_cat_title,
        alias: formVal.page_cat_alias,
        categoryDescription: formVal.page_cat_desc,
      };
      if( this.actionType == 'edit' ) {
        data.id = this.catId;
        url = this._url.pageCatUpdateUrl;
      }
      this._req.fetchApiData(url, data).subscribe(
        (data:any) => {
          console.log('data',data);
          let respSucc = data.data;
          let respErr = data.error;
          this.showLoader= false;
          this._utils.scrollToY(0,400,'easeInOutQuint');
          if( respSucc != '' ) {
            ( this.actionType == 'add' ) ? this.formResponseMsg = 'Category Added Successfully' : this.formResponseMsg = 'Category Updated Successfully';
            this.alertStatusMessage = true;
            setTimeout(()=>{
              this.router.navigate(['/page-category/lists'])
            },2000);
          }
          if( respErr != '' ) {
            this.formResponseMsg = respErr['Error Msg'];
            this.alertStatusMessage = false;
          }

        },
        error => {

        },
        () => {

        }
      )
    }
  }

  setAliasInput() {
    let formVal = this.createPageCatForm.value;
    let title = formVal.page_cat_title
    if( title != '') {
      let alias = title.replace(/\s+/g, '-').toLowerCase();
      this.createPageCatForm.controls['page_cat_alias'].setValue(alias);
    }
  }

  cancelPageCatCreate() {
    this.router.navigate(['/page-category/lists']);
  }

  getActionType() {
    if(this.actionType == 'edit') {
      this.showLoader = true;
    }
  }
  getPageCatVal() {
    let data = { id: this.catId };
    this._req.fetchApiData(this._url.getpageCatUrl,data).subscribe(
      (data:any) => {
        console.log('data',data);
        let resSucc = data.data;
        let resErr = data.error;
        this.setPageCatVal(resSucc[0]);
      },
      error => {

      },
      () => {
        this.showLoader = false;
      }
    )

  }

  setPageCatVal(data) {
    this.createPageCatForm.controls['page_cat_title'].setValue(data.categoryName);
    this.createPageCatForm.controls['page_cat_alias'].setValue(data.alias);
    this.createPageCatForm.controls['page_cat_desc'].setValue(data.categoryDescription);
  }



  ngOnInit() {
    this.createPageFormInit();
    this.route.params.subscribe(
      params => {
        this.catId = params.id;
        this.getPageCatVal();
      }
    )
  }


  ngOnChanges() {
    this.getActionType()
  }
}
