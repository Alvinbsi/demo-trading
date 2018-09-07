import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { UtilityService } from '../../../services/utilities/utilities.services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'hybse-admin-activity-logs',
  templateUrl: './activity-logs.component.html',
  styleUrls: ['./activity-logs.component.css']
})
export class ActivityLogsComponent implements OnInit {

  constructor(
    private _req: ApirequestService,
    private _url: ApiurlsService,
    private _utils:UtilityService,
    private _cdr:ChangeDetectorRef,
    private _fb: FormBuilder
  ) { }
  showLoader:boolean = true;
  activitiesLog:any = [];
  activitiesLogCount:any = 0;
  pageOffset:number = 0;
  pageLimit:number = 10;
  activityFilterForm:FormGroup;
  activityCodes:any = [];
  filterData:any = {
    username: '',
    activityCode: ''
  };
  activityFilterFormInit() {
    this.activityFilterForm = this._fb.group({
      'username': [''],
      'activityCode': ['']
    });
  }
  getActivitiesLog(offset,limit) {
    this.showLoader = true;
    let data = {
      offset: offset,
      limit: limit,
      data: this.filterData
    }
    this._req.fetchApiData(this._url.activityLogsUrl,data).subscribe(
      (data:any) => {
        console.log('Activity',data);
        let resSucc = data.data;
        let resErr = data.error;
        if( resSucc != '' ) {
          this.showLoader = false;
          this.activitiesLog = resSucc.userActivityList;
          this.activitiesLogCount = resSucc.userActivityLogCount;
          // this.activitiesLog = this._utils.paginatedItems(resSucc,0,this.pageSize);
          // this.pageListOriginal = resSucc;
        }
      },
      error => {

      },
      () => {

      }
    )
  }

  getActivityCode() {
    this._req.fetchApiData(this._url.activityCodeUrl,{}).subscribe(
      (data:any) => {
        console.log('Activity',data);
        let resSucc = data.data;
        let resErr = data.error;
        if( resSucc != '' ) {
          this.activityCodes = resSucc;
          console.log('this.activityCodes',this.activityCodes);
        }
      },
      error => {

      },
      () => {

      }
    )
  }

  filterLogs(form) {
    let formVal = this.activityFilterForm.value;
    let username = formVal.username;
    let codes = formVal.activityCode;
    this.filterData = formVal;
    this.getActivitiesLog(this.pageOffset,this.pageLimit);
  }

  /* Pagination */
  paginateContent(e) {
    console.log(e);
    let pageIndex = e.pageIndex;
    let pageSize = e.pageSize;
    let offset = pageIndex * pageSize;
    //alert(offset);
    this.getActivitiesLog(offset,this.pageLimit);
  }

  ngOnInit() {
    this.getActivitiesLog(this.pageOffset,this.pageLimit);
    this.getActivityCode();
    this.activityFilterFormInit();
  }
}
