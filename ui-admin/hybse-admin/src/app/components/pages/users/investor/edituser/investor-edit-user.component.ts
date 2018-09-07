import { Component, OnInit } from '@angular/core';
import { ApirequestService } from '../../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../../services/api-urls/apiurls.service';

@Component({
  selector: 'hybse-admin-investor-edit-user',
  templateUrl: './investor-edit-user.component.html',
  styleUrls: ['./investor-edit-user.component.css']
})
export class InvestorEditUserComponent implements OnInit {

  constructor( private _req: ApirequestService,
               private _url:ApiurlsService) { }


  userDetails: any = [];
  getUserDetails() {
    let data = {
      idUser: 4
    };
    this._req.fetchApiData(this._url.userDetailsUrl,data).subscribe(
      (data:any) => {
        console.log('USerdetail',data);
        this.userDetails = data.data;
      },
      err => {

      },
      () => {

      }
    )
  }
  ngOnInit() {
    this.getUserDetails();
  }

}
