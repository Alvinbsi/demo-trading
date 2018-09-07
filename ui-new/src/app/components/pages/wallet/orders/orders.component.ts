import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../../services/utilities/utilities.services';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { ApiDataServices } from '../../../../services/apiservices/api.services';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { StorageService } from '../../../../services/localstorage/storage.service';

@Component({
  selector: 'hybse-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
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


    userId:any;
    companyInfo:any;
    userType:any = '';

    getStoragesItem() {
      let userId = this._lstore.getLocalItems('user');
      let company = JSON.parse(this._lstore.getLocalItems('company'));
      let userType = this._lstore.getLocalItems('userType');
      if( userId != null ) {
        this.userId = userId;
      }
      if( company != null ) {
        this.companyInfo = company;
      }
      if( userType != null ) {
        this.userType = userType;
      }
      // console.log('this.companyInfo',company);
    }

    OpenOrders:any = [];
    FilledOrders:any = [];

    getActiveOrders(){
      let data = {
        idUser: this.userId,
        idCompanyStock: this.companyInfo.idCompanyStock,
        type:'open'
      };
      this._req.fetchApiData(this._urls.getTradeHistoryUrl,data).subscribe(
        (data:any) => {
          // console.log('open',data);
          let resSucc = data.data;
          let resErr = data.error;
          if(resSucc != '') {
            this.OpenOrders = resSucc;
          }
        },
        error => {
  
        },
        () => {
  
        }
    )
    }


    getMatchedOrders(){
      let data = {
        idUser: this.userId,
        idCompanyStock: this.companyInfo.idCompanyStock,
        type:'filled'
      };
      this._req.fetchApiData(this._urls.getTradeHistoryUrl,data).subscribe(
        (data:any) => {
                    //  console.log('my trades',data);
  
          let resSucc = data.data;
          let resErr = data.error;
          if(resSucc != '') {
            this.FilledOrders = resSucc;
          }
        },
        error => {
  
        },
        () => {
  
        }
    )
    }


  

  scrollToTop() {
    this._utils.scrollToY(0,400,'easeInOutQuint');
  }

  ngOnInit() {
    this.scrollToTop();
    this.getHistory();
    this.getStoragesItem();
    this.getActiveOrders();
    this.getMatchedOrders();
  }

}
