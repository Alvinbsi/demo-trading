import { Component, OnInit } from '@angular/core';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { MatDialog } from '@angular/material';
import { ConfirmdialogComponent } from '../../common/dialog/confirmdialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hybse-admin-locale',
  templateUrl: './locale.component.html',
  styleUrls: ['./locale.component.css']
})
export class LocaleComponent implements OnInit {

  constructor( private route:Router, private _req:ApirequestService,private _urls: ApiurlsService,private dialog: MatDialog,private _ar:ActivatedRoute ) { }
  allLocaleList:any = [];
  getLocaleList() {
    this._req.fetchApiData(this._urls.listLocaleUrl,{}).subscribe(
      (data:any) => {
        let response = data.data;
        if(response.length != 0 ) {
          this.allLocaleList = response;
        }
      },
      error => {
      },
      () => {
      }
    );
  }
  confirmDelete(id,i?,si=0) {
    const deleteDialog = this.dialog.open(ConfirmdialogComponent,{
      width: '400px',
      height: '170px',
      data: {
        message: 'Are you sure to delete this Locale?'
      }
    });

    deleteDialog.afterClosed().subscribe(
      data => {
        //console.log('Dialog data',data);
        if(data) this.deleteLocale(id,i,si);
      }
    );
  }
  deleteLocale(id,i,$i)
  {
    let data = { id: id };
    this._req.fetchApiData(this._urls.deleteLocaleUrl,data).subscribe(
      (data:any) => {
        console.log('UserList',data);
        let response = data;
        if(response != 0 ) this.getLocaleList();
      },
      error => {

      },
      () => {

      }
    );
  }

  updateLocale(id) {
    this.route.navigate(['/locale/update', id]);
  }



  ngOnInit() {
    this.getLocaleList();

  }

}
