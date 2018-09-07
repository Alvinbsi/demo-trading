import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'ng-animate';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';
import { UtilityService } from '../../../services/utilities/utilities.services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmdialogComponent } from '../../common/dialog/confirmdialog.component';

@Component({
  selector: 'hybse-admin-page-category',
  templateUrl: './page-category.component.html',
  styleUrls: ['./page-category.component.css'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation( fadeInDown,{
      params: {
        timing: 1,
        a: '-10px'
      }
    }))])
  ],
})
export class PageCategoryComponent implements OnInit {

  constructor( private _urls: ApiurlsService,
    private _utils: UtilityService,
    private dialog:MatDialog,
    private _req: ApirequestService,
    private router: Router ) { }
  showLoader:boolean = true;
  fadeInDown:any;
  pageCatList:any = [];
  getpageCatList() {
    this._req.fetchApiData(this._urls.pageCatListUrl,{}).subscribe(
      (data:any) => {
        console.log(data);
        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') this.pageCatList = resSucc;
      },
      error => {
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
        message: 'Are you sure to delete?'
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
    let data = { id: id };
    this._req.fetchApiData(this._urls.pageCatDeleteUrl,data).subscribe(
      (data:any) => {
        console.log('pageCatList',data);
        let response = data.data;
        if(response != 0 ) this.deleteUserFromList(response);
      },
      error => {

      },
      () => {

      }
    );
  }

  deleteUserFromList(id) {
    this.pageCatList = this._utils.filterArrayObj(this.pageCatList,'idContentCategory',id);
  }


  ngOnInit() {
    this.getpageCatList();
  }

}
