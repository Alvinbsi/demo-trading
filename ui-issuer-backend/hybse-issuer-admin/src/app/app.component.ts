import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from './services/localstorage/storage.service';
import { DataCommunication } from './services/utilities/data.comm';

@Component({
  selector: 'hybse-issueradmin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor( private route:ActivatedRoute, private _lstore:StorageService, private _dataCom:DataCommunication ) {

  }



  ngOnInit() {
    this._dataCom.getCompanyId();
  }
}
