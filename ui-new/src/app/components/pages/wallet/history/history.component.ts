import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { ApiDataServices } from '../../../../services/apiservices/api.services';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { StorageService } from '../../../../services/localstorage/storage.service';


@Component({
  selector: 'hybse-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private _utils: UtilityService, private _fb:FormBuilder, private _urls:ApiurlsService,    private _req: ApirequestService,    private _lstore: StorageService) { }
  idUser:any;
  withdrawalHistory:any;
  depositHistory:any;

  getHistory(){
            this.idUser = this._lstore.getLocalItems('user');

                         let data = {   
                                        idUser: this.idUser
                                    };
                                    this._req.fetchApiData(this._urls.nemHistoryUrl,data).subscribe(
                                      (data:any) => {
                                         let response = data.data;
                                         this.depositHistory = response.Deposit;
                                         this.withdrawalHistory = response.Withdraw;
                                      },
                                      error => {
                                
                                      },
                                      () => {
                                
                                      })
    }
  

  scrollToTop() {
    this._utils.scrollToY(0,400,'easeInOutQuint');
  }

  ngOnInit() {
    this.scrollToTop();
    this.getHistory();

  }

}
