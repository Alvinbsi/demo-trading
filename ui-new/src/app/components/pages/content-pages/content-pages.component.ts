import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';

@Component({
  selector: 'hybse-content-pages',
  templateUrl: './content-pages.component.html',
  styleUrls: ['./content-pages.component.css']
})
export class ContentPagesComponent implements OnInit {

  constructor(
    private router:ActivatedRoute,
    private _req: ApirequestService,
    private _urls: ApiurlsService
  ) { }

  engContent:string = '';
  germanContent:string = '';
  getPageContent(alias) {
    let data:any = {
      alias: alias
    }
    this._req.fetchApiData(this._urls.getPageUrl,data).subscribe(
      (data:any) => {
        // console.log(data);
        let resSucc = data.data;
        if(resSucc != '')
          this.engContent = data.data[0].body;

        // console.log(this.engContent);
      },
      error => {

      },
      () => {

      }
    )
  }

  ngOnInit() {

    this.router.params.subscribe(
      params => {
        if( params.alias != undefined ) this.getPageContent(params.alias);
      }
    )

  }

}
