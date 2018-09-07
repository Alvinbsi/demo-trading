import { Component, OnInit } from '@angular/core';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ConfirmdialogComponent } from '../../../common/dialog/confirmdialog.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { isNumber } from 'util';

@Component({
  selector: 'hybse-admin-view-menu',
  templateUrl: './view-menu.component.html',
  styleUrls: ['./view-menu.component.css']
})
export class ViewMenuComponent implements OnInit {

  constructor(private _req: ApirequestService,
    private _urls:ApiurlsService,
    private _utils: UtilityService,
    private dialog:MatDialog,
    private route: Router,
    private _fb: FormBuilder,
    private dragulaService:DragulaService ) {

      dragulaService.drag.subscribe((value) => {
        this.onDrag(value);
      });
    }


  createMenuItemForm:FormGroup;
  formResponseMsg:string = '';
  alertStatusMessage:boolean;
  updateMenuItem:boolean = false;
  showMILoader:boolean = false;
  pageAliases:any = [];
  menuNameId:any = '';
  createMenuItemInit() {
    this.createMenuItemForm = this._fb.group({
      'menu_item_id': [''],
      'menu_item_menuname': ['',[Validators.required]],
      'menu_item_title': ['',[Validators.required]],
      'menu_item_root': [''],
      'menu_item_urls': ['1',[Validators.required]],
      'menu_item_page': ['',[Validators.required]],
      'menu_item_order': ['',[Validators.required, Validators.min(1)]],
      'menu_item_enabled': ['1',[Validators.required]]
    });
  }

  onDrag(val) {
    console.log(this.allMenuList);
    console.log(val);
  }

  allMenuList:any = [];
  menuNameList:any = [];
  pageList:any = [];
  showLoader:boolean = false;


  getMenuItemById() {
    this.getAllMenuList(this.menuNameId);
  }

  getAllMenuList(id?) {
    this.showMILoader = true;
    let data = {id: id};
    this._req.fetchApiData(this._urls.listMenuItemUrl,data).subscribe(
      (data:any) => {
        console.log('MenuList',data);
        let resSucc = data.data;
        let resErr = data.error;
        console.log('resSucc',resSucc);
        this.allMenuList = this._utils.addPropInObj(resSucc,['collapseEdit','showLoader'],[false,false]);
        console.log('this.allMenuList',this.allMenuList);
      },
      error => {

      },
      () => {
        this.showMILoader = false;
      }
    );
  }
  getMenuName() {
    this._req.fetchApiData(this._urls.listAllMenuUrl,{}).subscribe(
      (data:any) => {
        console.log(data);
        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') {
          this.menuNameList = resSucc;
          console.log('213213',this.menuNameList);
          this.menuNameId = this.menuNameList[1].id;
          this.getAllMenuList(this.menuNameId);
        }
      },
      error => {

      },
      () => {

      }
    );
  }


  getAllPagesList() {
    this._req.fetchApiData(this._urls.pageListUrl,{}).subscribe(
      (data:any) => {
        console.log(data);
        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') this.pageList = resSucc; this.getPageAliases(this.pageList);
        console.log('this.pageList',this.pageList);
      },
      error => {

      },
      () => {

      }
    );
  }

  getPageAliases(data) {
    data.forEach(el => {
      this.pageAliases.push(el.alias);
    });
  }


  confirmDelete(id,i?,si=0) {
    const deleteDialog = this.dialog.open(ConfirmdialogComponent,{
      width: '400px',
      height: '170px',
      data: {
        message: 'Are you sure to delete this Menu Item?'
      }
    });

    deleteDialog.afterClosed().subscribe(
      data => {
        //console.log('Dialog data',data);
        if(data) this.deleteMenuItem(id,i,si);
      }
    );
  }

  deleteMenuItem(id,i?,si?) {
    let data = { id: id };
    this._req.fetchApiData(this._urls.deleteMenuItemsUrl,data).subscribe(
      (data:any) => {
        let response = data;
        if(response != 0 ) this.deletMenuItemFromList(data);

      },
      error => {

      },
      () => {

      }
    );
  }

  deletMenuItemFromList(id) {
    this.getAllMenuList(this.menuNameId);
    //this.allMenuList = this._utils.filterArrayObj(this.allMenuList,'id',id);
  }


  submitCreateMenuItem(form) {
    if(this.createMenuItemForm.valid) {
      let formVal = this.createMenuItemForm.value;
      let root = (formVal.menu_item_root == '' || formVal.menu_item_root == undefined) ? 0 : formVal.menu_item_root;
      let data:any = {
        idMenu: formVal.menu_item_menuname,
        menuTitle: formVal.menu_item_title,
        root: root,
        ordering: formVal.menu_item_order,
        isActive: formVal.menu_item_enabled,
        url: formVal.menu_item_page
      };
      let url = (this.updateMenuItem) ? this._urls.updateMenuItemsUrl : this._urls.createMenuItems;
      if(this.updateMenuItem) data.id = formVal.menu_item_id;

      this._req.fetchApiData(url,data).subscribe(
        (data:any) => {
          console.log(data);
          let resSucc = data.data;
          let resErr = data.error;
          this._utils.scrollToY(0,400,'easeInOutQuint');
          form.resetForm();
          if(resSucc != '') {
            this.formResponseMsg = (this.updateMenuItem) ? 'Menu Items has been updated Successfully' : 'Menu Items has been created Successfully';
            this.alertStatusMessage = true;
          }
          this.getAllMenuList(this.menuNameId);
          if(resErr != '') {
            this.formResponseMsg = resErr['Error Msg'];
            this.alertStatusMessage = false;
          }
          this.updateMenuItem = false;
        },
        error => {

        },
        () => {

        }
      )
    }
  }

  editMenuItem(menu,i,si:any = '' ) {
    this.updateMenuItem = true;

    isNumber
    let formVal = ( isNumber(si) ) ? this.allMenuList[i].subMenu[si] : this.allMenuList[i];
    let pageUrl = formVal.url;
    let pageOpt = ( this.pageAliases.indexOf(pageUrl) > -1 ) ? '1' : '0';
    console.log(formVal);
    this.createMenuItemForm.patchValue({
      'menu_item_id': formVal.id,
      'menu_item_menuname': formVal.idMenu,
      'menu_item_title': formVal.menuTitle,
      'menu_item_root': formVal.root == 0 ? '' : formVal.root,
      'menu_item_urls': pageOpt,
      'menu_item_page': pageUrl,
      'menu_item_order': formVal.ordering,
      'menu_item_enabled': formVal.isActive
    });
  }

  cancelMenuItem() {
    this.updateMenuItem = false;
  }

  ngOnInit() {
    this.getMenuName();
    //this.getAllMenuList();
    this.getAllPagesList();
    this.createMenuItemInit();
  }

}
