import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'ng-animate';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { MatDialog } from '@angular/material';
import { ConfirmdialogComponent } from '../../../common/dialog/confirmdialog.component';
import { UtilityService } from '../../../../services/utilities/utilities.services';

@Component({
  selector: 'hybse-admin-list-templates',
  templateUrl: './list-templates.component.html',
  styleUrls: ['./list-templates.component.css'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation( fadeInDown,{
      params: {
        timing: 1,
        a: '-10px'
      }
    }))])
  ],
})
export class ListTemplatesComponent implements OnInit {

  constructor( private _req:ApirequestService,
     private dialog: MatDialog,
     private _utils:UtilityService,
     private _urls:ApiurlsService) { }
  fadeInDown:any;
  templateLists:any = [];
  showLoader:boolean = true;
  getTemplateLists() {
    this._req.fetchApiData(this._urls.listMessageTemplateUrl,{}).subscribe(
      (data:any) => {
        let resSucc = data.data;
        let resErr = data.error;
        this.showLoader = false;
        if(resSucc != '') {
          this.templateLists = resSucc;
        }
        if(resErr != '') {

        }
      },
      error => {

      },
      () => {

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
    let data = { idMessageTemplate: id };
    this.showLoader = true;
    this._req.fetchApiData( this._urls.deleteMessageTemplateUrl, data ).subscribe(
      (data:any) => {
        let response = data.data;
        console.log('delete',response);
        if(response != '' ) this.deleteItemFromList( id );
      },
      error => {

      },
      () => {

      }
    );
  }

  deleteItemFromList(id) {
    this.showLoader = false;
    this.templateLists = this._utils.filterArrayObj(this.templateLists,'idMessageTemplate',id);
  }

  ngOnInit() {
    this.getTemplateLists();
  }

}
