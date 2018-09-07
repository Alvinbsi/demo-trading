import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilityService } from '../../../services/utilities/utilities.services';

@Component({
  selector: 'hybse-admin-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor( private _utils: UtilityService ) { }

  @Input() listLength:any = 0;
  @Input() sizeOption:any = [ 10, 25, 50, 100 ];
  @Input() pageSize:any = 0;

  @Input() paginateArr:any = '';
  @Output() paginateItem:  EventEmitter<any> = new EventEmitter();

  @Input() paginateEvent:any = '';

  serialNum:number = 1;
  paginateContent(e) {
      console.log(e);
      let pageIndex = e.pageIndex;
      let pageLength = e.length;
      let pageSize = e.pageSize;
      let pageList:any = { pageEvt: e };
      if( pageSize == this.pageSize ) {
        let startInd = (pageSize * pageIndex);
        let endInd = pageSize * (pageIndex + 1);
        this.serialNum = startInd + 1;
        pageList.items = this._utils.paginatedItems(this.paginateArr, startInd, endInd);
      } else {
        pageList.items = this._utils.paginatedItems(this.paginateArr, 0, pageSize);
        this.pageSize = pageSize;
        this.serialNum = 1;
      }
      pageList.serialNum = this.serialNum;
      this.paginateItem.emit(pageList);
  }

  refreshPaginate(e:any) {
    if( typeof e == 'object' ) {
      let pageIndex = e.pageIndex;
      //let pageLength = e.length;
      let pageSize = e.pageSize;
      let pageList:any = { pageEvt: e };
      if( pageSize == this.pageSize ) {
        let startInd = (pageSize * pageIndex);
        let endInd = pageSize * (pageIndex + 1);
        this.serialNum = startInd + 1;
        pageList.items = this._utils.paginatedItems(this.paginateArr, startInd, endInd);
      } else {
        pageList.items = this._utils.paginatedItems(this.paginateArr, 0, pageSize);
        this.pageSize = pageSize;
        this.serialNum = 1;
      }
      pageList.serialNum = this.serialNum;
      this.paginateItem.emit(pageList);
    }

  }


  ngOnInit() {

  }

  ngOnChanges() {
    this.refreshPaginate(this.paginateEvent);
  }

}
