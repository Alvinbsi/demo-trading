import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { Router } from '@angular/router';

@Component({
  selector: 'hybse-admin-create-menuitem',
  templateUrl: './create-menuitem.component.html',
  styleUrls: ['./create-menuitem.component.css']
})
export class CreateMenuitemComponent implements OnInit {

  constructor(private _fb:FormBuilder,
              private _req: ApirequestService,
              private _urls: ApiurlsService,
              private _utils: UtilityService,
              private route: Router ) { }

  showLoader:boolean = false;
  menuNameList:any = [];
  pageList:any = [];
  menuItemList:any = [];
  createMenuItemForm:FormGroup;
  formResponseMsg:string = '';
  alertStatusMessage:boolean;


  createMenuItemInit() {
    this.createMenuItemForm = this._fb.group({
      'menu_item_menuname': ['',[Validators.required]],
      'menu_item_title': ['',[Validators.required]],
      'menu_item_root': [''],
      'menu_item_page': ['',[Validators.required]],
      'menu_item_order': ['',[Validators.required, Validators.min(1)]],
      'menu_item_enabled': ['1',[Validators.required]]
    });
  }



  getMenuName() {
    this._req.fetchApiData(this._urls.listAllMenuUrl,{}).subscribe(
      (data:any) => {
        console.log(data);
        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') this.menuNameList = resSucc;
      },
      error => {

      },
      () => {

      }
    );
  }

  getAllMenuList() {
    this._req.fetchApiData(this._urls.listAllMenuItemUrl,{}).subscribe(
      (data:any) => {
        console.log('MenuList',data);
        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') this.menuItemList = resSucc;
        console.log(this.menuItemList);
      },
      error => {

      },
      () => {

      }
    )
  }

  getAllPagesList() {
    this._req.fetchApiData(this._urls.pageListUrl,{}).subscribe(
      (data:any) => {
        console.log(data);
        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') this.pageList = resSucc;
        console.log('this.pageList',this.pageList);
      },
      error => {

      },
      () => {

      }
    );
  }


  submitCreateMenuItem() {
    if(this.createMenuItemForm.valid) {
      let formVal = this.createMenuItemForm.value;
      let root = (formVal.menu_item_root == '' || formVal.menu_item_root == undefined) ? 0 : formVal.menu_item_root;
      let data = {
        idMenu: formVal.menu_item_menuname,
        menuTitle: formVal.menu_item_title,
        root: root,
        ordering: formVal.menu_item_order,
        isActive: formVal.menu_item_enabled,
        url: formVal.menu_item_page
      };
      this._req.fetchApiData(this._urls.createMenuItems,data).subscribe(
        (data:any) => {
          console.log(data);
          let resSucc = data.data;
          let resErr = data.error;
          this._utils.scrollToY(0,400,'easeInOutQuint');
          if(resSucc != '') {
            this.formResponseMsg = 'Menu Items has been created Successfully';
            this.alertStatusMessage = true;
            setTimeout(() => {
              this.route.navigate(['/menu-item/view']);
            }, 2000);

          }

          if(resErr != '') {
            this.formResponseMsg = resErr['Error Msg'];
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

  cancelMenuItem() {

  }


  ngOnInit() {
    this.getMenuName();
    this.getAllMenuList();
    this.getAllPagesList();
    this.createMenuItemInit();
  }

}
