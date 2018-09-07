import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'ng-animate';
import { UserService } from '../../../../../services/user/user.service';
import { ApirequestService } from '../../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../../services/api-urls/apiurls.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmdialogComponent } from '../../../../common/dialog/confirmdialog.component';
import { Router } from '@angular/router';
import { UtilityService } from '../../../../../services/utilities/utilities.services';

@Component({
  selector: 'hybse-admin-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation( fadeInDown,{
      params: {
        timing: 1,
        a: '-10px'
      }
    }))])
  ],
})
export class ListusersComponent implements OnInit {

  constructor(public _us:UserService,
              public _req: ApirequestService,
              public _urls: ApiurlsService,
              public _utils: UtilityService,
              public dialog:MatDialog,
              public utils: UtilityService,
              public router: Router ) { }
  fadeInDown:any;
  userList:any = [];
  pageListOriginal:any = [];
  showLoader:boolean = true;
  @Input() userType:string = 'Admin';
  listTitle:string = 'User List';
  getUserList(type) {
    let data = {
      userType: this.userType
    };
    this._req.fetchApiData(this._urls.adminListUrl,data).subscribe(
      (data:any) => {
        let response = data.data;
        if(response.length != 0 ) {
          this.userList = response;
          this.pageListOriginal = response;
          console.log( 'this.userList', this.userList );
        }
      },
      error => {
        this.showLoader = false;
      },
      () => {
        this.showLoader = false;
      }
    );
  }


  confirmDelete(id) {
    const deleteDialog = this.dialog.open(ConfirmdialogComponent,{
      width: '400px',
      height: '170px',
      data: {
        message: 'Are you sure to delete this user?'
      }
    });

    deleteDialog.afterClosed().subscribe(
      data => {
        //console.log('Dialog data',data);
        if(data) this.deleteUser(id);
      }
    );
  }

  deleteUser(id) {
    let data = { data: { idUser: id } };
    this._req.fetchApiData(this._urls.deleteUserUrl,data).subscribe(
      (data:any) => {
        console.log('UserList',data);
        let response = data;
        if(response != 0 ) this.deleteUserFromList(data);
      },
      error => {

      },
      () => {

      }
    );
  }

  deleteUserFromList(id) {
    this.userList = this.utils.filterArrayObj(this.userList,'id',id);
  }

  editUser(id) {
    if(this.userType == 'Admin') {
      this.router.navigate(['/admin/edit-user', id]);
    } else {
      this.router.navigate(['/investor/edit-user', id]);
    }
  }


  toggleActive(user,e) {
    let status = e.checked ? 'Active' : 'Inactive';
    let active = e.checked ? '0' : '1';
    const activeDialog = this.dialog.open(ConfirmdialogComponent,{
      width: '400px',
      height: '170px',
      data: {
        message: 'Are you sure to '+status+' the '+ user.userName +'?'
      }
    });

    activeDialog.afterClosed().subscribe(
      data => {
        (data) ? this.toggleActiveUser(user.id,e) : this.userList = this.utils.changeArrayObjProp(this.userList,'id',user.id,'isActive',!e.checked);
        console.log( 'this.userList', this.userList );
      }
    );
  }
  toggleActiveUser(id,e) {
    let data = {
      id: id,
      active: e.checked ? 1 : 0
    };
    this.userList = this.utils.changeArrayObjProp(this.userList,'id',id, 'isActive',e.checked);
    this._req.fetchApiData(this._urls.userActiveUrl,data).subscribe(
      (data:any) => {
        console.log(data);
        let id = data.data.id;
        this.userList = this.utils.changeArrayObjProp(this.userList,'id',id, 'isActive',e.checked);
      },
      error => {

      },
      () => {

      }
    );
  }


  ngOnInit() {
    if(this.userType == 'Admin') this.getUserList(this.userType);
  }

  ngOnChanges() {
    if(this.userType != 'Admin') this.getUserList(this.userType);
  }

}
