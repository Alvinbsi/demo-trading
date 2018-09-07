import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'ng-animate';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmdialogComponent } from '../../common/dialog/confirmdialog.component';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { Router } from '@angular/router';
import { UtilityService } from '../../../services/utilities/utilities.services';


@Component({
  selector: 'hybse-admin-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation( fadeInDown,{
      params: {
        timing: 1,
        a: '-10px'
      }
    }))])
  ],
})
export class CompanyComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public _api: ApirequestService,
              public _urls: ApiurlsService,
              public _utils: UtilityService,
              public router: Router ) { }

  listTitle:string = 'Company List';
  showLoader:boolean = true;
  companyList:any = [];
  fadeInDown:any;

  confirmDelete(id) {
    const deleteDialog = this.dialog.open(ConfirmdialogComponent,{
      width: '400px',
      height: '170px',
      data: {
        message: 'Are you sure to delete this Company?'
      }
    });

    deleteDialog.afterClosed().subscribe(
      data => {
        if(data) this.deleteCompany(id);
      }
    );
  }

  checkActive(active,type) {
    if(active) {
      return type == 'bool' ? true : 'Active';
    } else {
      return type == 'bool' ? false : 'Inactive';
    }
  }

  editCompany(id) {
    this.router.navigate(['/company/update', id]);
  }

  toggleActive(comp,e) {

    let status = e.checked ? 'Active' : 'Inactive';
    const activeDialog = this.dialog.open(ConfirmdialogComponent,{
      width: '400px',
      height: '170px',
      data: {
        message: 'Are you sure to '+status+' the '+ comp.CompanyName +'?'
      }
    });
    activeDialog.afterClosed().subscribe(
      data => {
        if(data)  this.toggleActiveUser(comp.CompanyId,e);
      }
    );
  }
  toggleActiveUser(id,e) {
    let data = {
      id: id,
      active: e.checked ? 1 : 0
    }
    this._api.fetchApiData(this._urls.companyActiveUrl,data).subscribe(
      (data:any) => {
        let id = data.data.id;
        console.log(data);console.log(id);console.log(e.checked);
        this.companyList = this._utils.changeArrayObjProp(this.companyList,'CompanyId',id, 'isActive',e.checked);
        console.log('this.companyList',this.companyList);
      },
      error => {

      },
      () => {

      }
    );
  }

  deleteCompany(id) {
    let data = { id: id };
    this._api.fetchApiData(this._urls.companyDeleteUrl,data).subscribe(
      (data:any) => {
        let response = data;
        if(response != 0 ) this.deleteCompFromList(data);
      },
      error => {

      },
      () => {

      }
    );
  }

  deleteCompFromList(id) {
    this.companyList = this._utils.filterArrayObj(this.companyList,'CompanyId',id);
  }

  getCompanyList() {
    this._api.fetchApiData(this._urls.compListUrl,{},'post').subscribe(
      (data:any) => {
        let response = data.data;
        let resErr = data.error;
        if(response != '') {
          this.companyList = response;
        }
        if(resErr != '') {
          //this.companyList = response;
        }
      },
      error=> {
        this.showLoader = false;
      },
      () => {
        this.showLoader = false;
      }
    )
  }

  ngOnInit() {
    this.getCompanyList();
  }

}
