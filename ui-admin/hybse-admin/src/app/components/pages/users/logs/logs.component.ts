import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { MatDialog } from '@angular/material';
import { ConfirmdialogComponent } from '../../../common/dialog/confirmdialog.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';

@Component({
  selector: 'hybse-admin-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor(private route: Router,
    private _ar: ActivatedRoute,
    private _req: ApirequestService,
    private _utils: UtilityService,
    private _cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private _url:ApiurlsService ) { }

  userLogs:any = [];
  showLoader:boolean = true;
  getUserLogs(id) {
    let data = {
      data: {idUser:id }
    }
    this._req.fetchApiData(this._url.userLoginDetailsUrl,data).subscribe(
      (data:any) => {
        console.log('UserLoginDeatails',data);
        let resSucc = data.data;
        let resErr = data.error;
        if( resSucc != '' ) {
          this.showLoader = false;
          this.userLogs = this._utils.paginatedItems(resSucc,0,this.pageSize);
          this.pageListOriginal = resSucc;
        }
      }
    )
  }


  /* Pagination */
  pageSize:number = 10;
  paginateLength:number = 0;
  pageListOriginal:any = [];
  paginateEvent:any = {
    length: 100,
    pageIndex: 0,
    pageSize: this.pageSize
  };
  serialNum:number = 1;
  getPaginateItem(e) {
    this.serialNum = e.serialNum;
    this.userLogs = e.items;
    this.paginateEvent = e.pageEvt;
    this._cdr.detectChanges();
  }
  getSerialNum(ind) {
    return this.serialNum + ind;
  }
  initiatePaginate() {
    this.paginateLength = this.pageListOriginal.length;
  }
  activityDetail(id) {
    this.showLoader= true;
    let data = {
      id:id 
    }   
     this._req.fetchApiData(this._url.activityDetailsUrl,data).subscribe(
      (data:any) => {
        let resSucc = data.data;
        let resErr = data.error;
        this.showLoader = false;
        if(resSucc!="") this.activitydetailPopup(resSucc[0]);
      }
    )
  }
activitydetailPopup(data)
{
  const deleteDialog = this.dialog.open(ActivityDetailsComponent,{
    width: '1000px',
    height: '250px',
    data: {
      activityDetail: data
    }
  });

  deleteDialog.afterClosed().subscribe(
    data => {
     
    }
  );
}
  ngOnInit() {
    this._ar.params.subscribe(
      (data:any) => {
        let id = data.id;
        this.getUserLogs(id);
      }
    )
  }

}
