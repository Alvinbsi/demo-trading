import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup,  FormGroupDirective, NgForm } from '@angular/forms';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { BlurInputErrorMatcher } from '../../../../modules/material/material.errror';
import { ConfirmdialogComponent } from '../../../common/dialog/confirmdialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'hybse-admin-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {

  constructor(private _fb:FormBuilder,
    private _req:ApirequestService,
    private _urls:ApiurlsService,
    private dialog: MatDialog,
    private _utils:UtilityService ) { }

  showLoader:boolean = false;
  showTableLoader:boolean = false;
  allMenuList:any = [];
  blurMatcher = new BlurInputErrorMatcher();
  createMenuForm:FormGroup;
  formResponseMsg:string = '';
  alertStatusMessage:boolean;
  updateMenuName:boolean = false;
  createMenuFormInit() {
    this.createMenuForm = this._fb.group({
      'menu_id': [''],
      'menu_title': ['',[Validators.required]]
    });
  }
  cancelMenuCreate() {
    this.updateMenuName = false;
  }
  // pageList:any = [];
  // getPageLists() {
  //   this._req.fetchApiData(this._urls.pageListUrl,'').subscribe(
  //     (data:any) => {
  //       console.log(data);
  //       let resSucc = data.data;
  //       let resErr = data.error;
  //       if( resSucc != '' ) this.pageList = resSucc;
  //       console.log('this.pageList',this.pageList);
  //     },
  //     error => {
  //     },
  //     () => {

  //     }
  //   );
  // }

  getAllMenuList() {
    this.showLoader = true;
    this._req.fetchApiData(this._urls.listAllMenuUrl,{}).subscribe(
      (data:any) => {
        let resSucc = data.data;
        let resErr = data.error;
        if( resSucc != '' )
          this.allMenuList = resSucc;

        console.log(this.allMenuList);
      },
      error => {

      },
      () => {
        this.showLoader = false;
      }
    );
  }

  createUpdateMenu(form) {
    if( this.createMenuForm.valid ) {
      let formVal = this.createMenuForm.value;
      this.addUpdateMenuItem(formVal);
      form.resetForm();
    }
  }


  addUpdateMenuItem(val) {
    let data:any = {
      menuName: val.menu_title
    };
    let url = this._urls.createMenuUrl;
    if(this.updateMenuName) {
      url = this._urls.updateMenuUrl;
      data.id = val.menu_id;
    }
    console.log('data',data);
    this.showTableLoader = true;
    this._req.fetchApiData(url,data).subscribe(
      (data:any) => {
        let resSucc = data.data;
        let resErr = data.error;
        this.createMenuForm.patchValue({
          'menu_title': data.menuName,
          'menu_id': data.id
        });
        if(resSucc != '') {
          this.formResponseMsg = (this.updateMenuName) ? 'Menu Name has been Successfully Updated' : 'Menu Name has been Successfully Created';
          this.alertStatusMessage = true;
          this.addUpdateNewItem(resSucc[0]);
        }

        if(resErr != '') {
          this.formResponseMsg = resErr['Error Msg'];
          this.alertStatusMessage = false;
        }

        this.updateMenuName = false;
      },
      error => {

      },
      () => {
        this.showTableLoader = false;
      }
    );
  }

  addUpdateNewItem(data) {
    if(this.updateMenuName) {
      this.allMenuList.forEach(ele => {
        if(data.id == ele.id) ele.menuName = data.menuName;
      });
    } else {
      this.allMenuList.push(data);
    }
  }

  updateMenu(data) {
    this.createMenuForm.patchValue({
      'menu_title': data.menuName,
      'menu_id': data.id
    });
    console.log('data',data);
    console.log('this.createMenuForm',this.createMenuForm.value);
    this.updateMenuName = true;
  }

  confirmDelete(id) {
    const deleteDialog = this.dialog.open(ConfirmdialogComponent,{
      width: '400px',
      height: '170px',
      data: {
        message: 'Are you sure to delete?'
      }
    });

    deleteDialog.afterClosed().subscribe(
      data => {
        if(data) this.deleteMenu(id);
      }
    );
  }

  deleteMenu(id) {
    let data = { id: id };
    this.showTableLoader = true;
    this._req.fetchApiData( this._urls.deleteMenuUrl,data ).subscribe(
      (data:any) => {
        console.log('pageCatList',data);
        let response = data.data;
        if(response != 0 ) this.deleteMenuFromList(response);
      },
      error => {

      },
      () => {
        this.showTableLoader = false;
      }
    );
  }

  deleteMenuFromList(id) {
    this.allMenuList = this._utils.filterArrayObj(this.allMenuList,'id',id);
  }




  ngOnInit() {
    this.createMenuFormInit();
    this.getAllMenuList();
  }

}
