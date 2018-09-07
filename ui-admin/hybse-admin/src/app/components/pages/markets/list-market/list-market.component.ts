import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'ng-animate';
import { MatDialog } from '@angular/material';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { ConfirmdialogComponent } from '../../../common/dialog/confirmdialog.component';

@Component({
  selector: 'hybse-admin-list-market',
  templateUrl: './list-market.component.html',
  styleUrls: ['./list-market.component.css'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation( fadeInDown,{
      params: {
        timing: 1,
        a: '-10px'
      }
    }))])
  ],
})
export class ListMarketComponent implements OnInit {

  constructor(
    private _api: ApirequestService,
    private _utils: UtilityService,
    private dialog: MatDialog,
    private _urls: ApiurlsService
  ) { }
  fadeInDown:any;
  marketList:any = [];
  showLoader:boolean = true;
  getMarketList() {
    this._api.fetchApiData(this._urls.listMarketUrl,{}).subscribe(
      (data:any) => {
        console.log(data);
        let resSucc = data.data;
        if(resSucc != '') this.marketList = resSucc;
      },
      error => {

      },
      () => {
        this.showLoader = false;
      }
    )
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
        if(data) this.deleteItem(id);
      }
    );
  }

  deleteItem(id) {
    let data = { id: id };
    this._api.fetchApiData( this._urls.deleteMarketUrl, data ).subscribe(
      (data:any) => {
        let response = data.data;
        if(response != 0 ) this.deleteItemFromList(response);
      },
      error => {

      },
      () => {

      }
    );
  }

  deleteItemFromList(id) {
    this.marketList = this._utils.filterArrayObj(this.marketList,'id',id);
  }

  ngOnInit() {
    this.getMarketList();
  }



}
