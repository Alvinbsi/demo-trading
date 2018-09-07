import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'ng-animate';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { UtilityService } from '../../../services/utilities/utilities.services';
import { MatDialog, MatPaginator } from '@angular/material';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';
import { Router } from '@angular/router';
import { ConfirmdialogComponent } from '../../common/dialog/confirmdialog.component';
@Component({
  selector: 'hybse-admin-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation( fadeInDown,{
      params: {
        timing: 1,
        a: '-10px'
      }
    }))])
  ],
})
export class PageComponent implements OnInit {

  constructor(private _urls: ApiurlsService,
    private _utils: UtilityService,
    private dialog: MatDialog,
    private _req: ApirequestService,
    private _cdr: ChangeDetectorRef,
    private router: Router
  ) { }
  showLoader:boolean = true;
  fadeInDown:any;
  @ViewChild(MatPaginator) paginate: MatPaginator;

  pageList:any = [];
  pageListOriginal:any = [];
  getpageList() {
    this._req.fetchApiData(this._urls.pageListUrl,{}).subscribe(
      (data:any) => {
        console.log(data);
        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') {
          this.pageListOriginal = resSucc;
          this.pageList = this._utils.paginatedItems(resSucc,0,this.pageSize);
        }
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
    this._req.fetchApiData( this._urls.pageDeleteUrl,data ).subscribe(
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
    this.pageList = this._utils.filterArrayObj(this.pageList,'id',id);
    this.pageListOriginal = this._utils.filterArrayObj(this.pageListOriginal,'id',id);
    this.initiatePaginate();
  }



  /* Pagination */
  pageSize:number = 10;
  paginateLength:number = 0;
  paginateEvent:any = {
    length: 100,
    pageIndex: 0,
    pageSize: this.pageSize
  };
  serialNum:number = 1;
  getPaginateItem(e) {
    this.serialNum = e.serialNum;
    this.pageList = e.items;
    this.paginateEvent = e.pageEvt;
    this._cdr.detectChanges();
  }
  getSerialNum(ind) {
    return this.serialNum + ind;
  }
  initiatePaginate() {
    this.paginateLength = this.pageListOriginal.length;
  }


  ngOnInit() {
    this.getpageList();
  }

  ngAfterViewInit() {

  }



}
