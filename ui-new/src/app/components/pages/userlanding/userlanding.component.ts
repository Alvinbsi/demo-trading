import { ApirequestService } from './../../../services/apirequest/apirequest.service';
import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { FormGroup, FormArray,FormControl, FormBuilder, FormArrayName ,Validators } from '@angular/forms';
import { ViewChild,ElementRef,HostListener } from '@angular/core';
import { ApiDataServices } from '../../../services/apiservices/api.services';
import { UtilityService } from '../../../services/utilities/utilities.services';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../services/localstorage/storage.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService} from 'angular2-toaster';




@Component({
  selector: 'hybse-userlanding',
  templateUrl: './userlanding.component.html',
  styleUrls: ['./userlanding.component.css']
  

})
export class UserlandingComponent implements OnInit {



  constructor(public _bf:FormBuilder,
    private _api:ApirequestService,
    public _lf:FormBuilder,
    public _sf:FormBuilder,
    public route:ActivatedRoute,
    private router: Router,
    public _urls:ApiurlsService,
    public _lstore:StorageService,
    public _req: ApirequestService,
    private _utils: UtilityService,

    ) {        }
    
   



  buyForm:FormGroup;
  limitForm:FormGroup;
  sellForm:FormGroup;
  sellOrder:any[] = [];
  buyOrder:any[] = [];
  buyFormValidate:boolean=false;
  responseSuccess:boolean = false;
  disableButton:boolean = false;
  showLoader:boolean = false;
  showLoadersell:boolean = false;
  companyId:any = '';
  modalPopUpToggle:boolean = false;
  modalAnimateClass = "slideInDown";

  tempCompanyIdStock:any;
  tempBuyOrder:any;

  tempSellCompanyIdStock:any;
  tempSellOrder:any;
  OrderBtn:boolean = true;
  
  secondaryCompanyId:any;

  confirmBuyModal(buyCompanyIdStock,buyidBuyorder){

    this.modalPopUpToggle = true;
    this.tempCompanyIdStock = buyCompanyIdStock;
    this.tempBuyOrder = buyidBuyorder;
    this.OrderBtn = true;
    // alert(this.OrderBtn);
     console.log(this.tempCompanyIdStock);
     console.log(this.tempBuyOrder);
  }

  confirmSellModal(sellCompanyIdStock,sellIdSellorder){

    this.modalPopUpToggle = true;
    this.tempSellCompanyIdStock = sellCompanyIdStock;
    this.tempSellOrder = sellIdSellorder;
    this.OrderBtn = false;
    // alert(this.OrderBtn);
    //  console.log(this.tempCompanyIdStock);
    //  console.log(this.tempBuyOrder);
  }


  modalClose() {
    //this.modalAnimateClass = this.modalPopUpToggle ? 'slideInDown' : 'modalSlideUp';
    this.modalAnimateClass = 'modalSlideUp';
    setTimeout(()=> {
      this.modalPopUpToggle = false;
      this.modalAnimateClass = 'slideInDown';
    }, 300 );

  }


  registerFormInit()
  {
      this.buyForm = this._bf.group({
        'buyAmount': ['', [Validators.required,this.validateNumberDecimal]],
        'buyTotal':  ['', [Validators.required,this.validateNumberDecimal]],
        'multipliedBuyShare': ['']

      },{ updateOn: 'blur'});
  }

  limitFormInit()
  {
      this.limitForm = this._lf.group({
        'limit': ['', [Validators.required]],
        'limitAmount':  ['', [Validators.required]],
        'limitTotal':  ['', [Validators.required]]
      },{ updateOn: 'blur'});

  }

  sellFormInit()
  {
      this.sellForm = this._sf.group({
        'sellAmount': ['', [Validators.required,this.validateNumberDecimal]],
        'sellTotal':  ['', [Validators.required,this.validateNumberDecimal]],
        'multipliedsellShare': ['']
      },{ updateOn: 'blur'});
  }



  getOrderBook() {
      let data = {
        idUser: this.userId,
        idCompany: this.companyInfo.idCompany,
        idCompanyStock: this.companyInfo.idCompanyStock
      };
      this._req.fetchApiData(this._urls.getOrderBookUrl,data).subscribe(
          (data:any) => {
            let resSucc = data.data[0];
            let resErr = data.error;
            if(resSucc != '') {
              this.sellOrder = resSucc.sellOrder;
              this.buyOrder = resSucc.buyOrder;
            }
          },
          error => {

          },
          () => {

          }
      )
  }

  buyOrderRes:string = '';
  buyResStatus:boolean = false;
  submitBuyOrder() {
    if(this.buyForm.valid) {
        this.showLoader = true;
        this.buyOrderRes = '';
        let formVal = this.buyForm.value
        let data = {
            bidPrice: formVal.buyAmount,
            bidSize: formVal.buyTotal,
            idCompanyStock: this.companyInfo.idCompanyStock,
            idUser: this.userId,
            idCompany: this.companyInfo.idCompany
        };
        this._req.fetchApiData(this._urls.buyOrderUrl,data).subscribe(
            (data:any) => {
                // console.log(data);
                this.showLoader = false;
                let resSucc = data.data;
                let resErr = data.error;
                this.buyForm.reset();
                this.buyForm.get('buyAmount').setValue(this.stockInfo.price);
                if( resSucc != '' ) {
                  this.getOrderBook();
                  this.getPrimaryActDetail();
                  this.getmyTradeHistory();
                  this.getTradeHistory();
                  this.getOpenOrders();
                  this.getFilledOrders();
                  this.getAllOrders();
                  this.buyResStatus = true;
                  this.buyOrderRes = 'Buy Order Submitted Successfully';
                }
                if( resErr != '' ) {
                  this.buyResStatus = false;
                  this.buyOrderRes = resErr['Error Description'];
                }

            },
            error => {

            },
            () => {

            }
        )
    }



  }

  buyPrice:any;
  buyAmount:any;
  buyTotal:any;
  multipliedShares:any = '';


  calculateTotal() {
    let amount = this.buyForm.value;
    if(amount.buyAmount != '' && amount.buyTotal != '') {
      this.multipliedShares = isNaN(amount.buyAmount * amount.buyTotal) ? 0 : amount.buyAmount * amount.buyTotal;
    }
  }

  sellPrice:any;
  sellAmount:any;
  sellTotal:any;
  sellmultipliedShares:any = '';

  calculatesellTotal() {
    let amountSell = this.sellForm.value;
    if(amountSell.sellAmount != '' && amountSell.sellTotal != '') {
      this.sellmultipliedShares = isNaN(amountSell.sellAmount * amountSell.sellTotal) ? 0 : amountSell.sellAmount * amountSell.sellTotal;
    }
  }




  sellOrderRes:string = '';
  sellResStatus:boolean = false;
  submitSellorder(){
      if(this.sellForm.valid){
          this.showLoadersell = true;
          this.sellOrderRes = '';
          let formVal = this.sellForm.value
          let data = {
            askPrice: formVal.sellAmount,
            askSize: formVal.sellTotal,
            idCompanyStock: this.companyInfo.idCompanyStock,
            idUser: this.userId,
            idCompany: this.companyInfo.idCompany
          };
          this._req.fetchApiData(this._urls.sellOrderUrl,data).subscribe(
              (data:any) => {
                // console.log(data);
                this.showLoadersell = false;
                let resSucc = data.data;
                let resErr = data.error;
                this.sellForm.reset();
                this.sellForm.get('sellAmount').setValue(this.stockInfo.price);

                if( resSucc != '' ) {
                  this.getOrderBook();
                  this.getSecondaryActDetail();
                  this.getmyTradeHistory();
                  this.getTradeHistory();
                  this.getOpenOrders();
                  this.getFilledOrders();
                  this.getAllOrders();
                  this.sellResStatus = true;
                  this.sellOrderRes = 'Sell Order Submitted Successfully';
                }
                if( resErr != '' ) {
                  this.sellResStatus = false;
                  this.sellOrderRes = resErr['Error Description'];
                }
              },
              error => {

              },
              () => {

              }
          )
      }

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

  stockInfo:any = '';
  cpdisplay:any;
  opdisplay:any;
  glpdisplay:any;
  glptempdisplay:any;
  change:any;

  getStockInfo() {
    let data = {
      // idCompany: this.companyInfo.idCompany,
      idCompanyStock: this.companyInfo.idCompanyStock
    };
    this._req.fetchApiData(this._urls.getStockInfoUrl,data).subscribe(
        (data:any) => {
          let resSucc = data.data;
          let resErr = data.error;
          if(resSucc != '') {
            this.stockInfo = resSucc[0];

            this.secondaryCompanyId = this.stockInfo.idCompany;
            this.buyForm.get('buyAmount').setValue(this.stockInfo.priceCurrent);
            this.sellForm.get('sellAmount').setValue(this.stockInfo.priceCurrent);     
          }
        },
        error => {

        },
        () => {

        }
    )
  }

 





  removeStorage() {
    this._lstore.removeItem('company');
  }

  primaryDetail:any = [];
  walletbalence:any;
  shareValue:any;
  symbol:any;
  sharesymbol:any;

  getPrimaryActDetail() {
    let userId = this._lstore.getLocalItems('user');
    if(userId != null) {
      let data = { idUser: userId };
      // let data = { idUser: 150 };
      this._req.fetchApiData( this._urls.getPrimaryActUrl, data ).subscribe(
        (data:any) => {
          // console.log('data',data)
          let resSucc = data.data[0];
          console.log(resSucc);
          let resErr = data.error;

          if(resSucc != '') {
            this.primaryDetail = resSucc;
            
            this.walletbalence = resSucc.availableAmount;
            this.symbol = resSucc.symbol;
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

  }

  secondaryDetail:any = [];
  CompanyTotalAmount:any;
  idCompanyTemp:any;
  i:any;
  getSecondaryActDetail() {
    let userId = this._lstore.getLocalItems('user');
    if(userId != null) {
      let data = { idUser: userId };
      // let data = { idUser: 150 };
      this._req.fetchApiData( this._urls.getSecondaryActUrl, data ).subscribe(
        (data:any) => {
          let resSucc = data.data[0];
          let resErr = data.error;

          if(resSucc != '') {
            this.idCompanyTemp =  this.companyInfo.idCompany;
            this.shareValue = resSucc.availableAmount;
            this.sharesymbol = resSucc.symbol;
           
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
  }

  myTrades:any = [];
  marketTrades:any = [];

  getmyTradeHistory(){
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
          this.myTrades = resSucc;
        }
      },
      error => {

      },
      () => {

      }
  )
  }


  getTradeHistory(){
    let data = {
      idUser: this.userId,
      idCompanyStock: this.companyInfo.idCompanyStock,
      type:'market'
    };
    this._req.fetchApiData(this._urls.getTradeHistoryUrl,data).subscribe(
      (data:any) => {
        // console.log('market trades',data);

        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') {
          this.marketTrades = resSucc;
        }
      },
      error => {

      },
      () => {

      }
  )
  }

  OpenOrders:any = [];
  FilledOrders:any = [];
  AllOrders:any = [];



  openBuyOrder:any = [];
  openSellOrder:any = [];
  
  getOpenOrders(){
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
          this.getOpenBuySell(resSucc);
        }
      },
      error => {

      },
      () => {

      }
  )
  }

  getOpenBuySell(data) {
    this.openSellOrder = data.filter((ele:any)=> {
      return ele.type == 'sell';
    });
    this.openBuyOrder = data.filter((ele:any)=> {
      return ele.type == 'buy';
    });
  }



  getFilledOrders(){
    let data = {
      idUser: this.userId,
      idCompanyStock: this.companyInfo.idCompanyStock,
      type:'open'
    };
    this._req.fetchApiData(this._urls.getTradeHistoryUrl,data).subscribe(
      (data:any) => {
        // console.log('filled',data);
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
  };
  getAllOrders(){
    let data = {
      idUser: this.userId,
      idCompanyStock: this.companyInfo.idCompanyStock,
      type:'open'
    };
    this._req.fetchApiData(this._urls.getTradeHistoryUrl,data).subscribe(
      (data:any) => {
        // console.log('all',data);
        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') {
          this.AllOrders = resSucc;
        }
      },
      error => {

      },
      () => {

      }
  )
  };









  scrollToTop() {
    this._utils.scrollToY(0,400,'easeInOutQuint');
  }

  validateNumber(input:FormControl) {
    let val = input.value;
   let regex =/^\d+$/;
    if (!regex.test(val) && val != '' )  {
        return {
            numberInvalid: true
        }
    }

    return null;
}

  validateNumberDecimal(input:FormControl) {
    let val = input.value;
   let regex =/((\d+)((\.\d{1,2})?))$/;
    if (!regex.test(val) && val != '' )  {
        return {
            numberInvalid: true
        }
    }

    return null;
}

checkUserType(type) {
  switch (type) {
    case 'Admin':

      break;
    case 'Issuer':

      break;
    case 'Investor':

      break;
    default:
      break;
  }
}

closeNews(){
  var x = document.getElementById("newsDiv");
  x.style.display = "none";
}




stockList:any = [];
  stockListError:string = '';

  getStockList() {
    this._api.fetchApiData(this._urls.getStockListUrl,{},'get').subscribe(
      (data:any) => {
        // console.log('StockList',data);

        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') this.stockList = resSucc;
        if(resErr != '') this.stockListError = resErr['Error Description'];
      },
      error => {

      },
      () => {

      }
    )
  }


  cp:any;
  op:any;
  glp:any;
  glptemp:any;

  getGainLossPercent(stock) {
    this.cp = stock.priceCurrent;
    this.op = stock.priceClose;
    if(this.cp != 0 && this.op != 0 )
    {
    this.glptemp = ((this.cp - this.op)/this.op)*100 ;
    this.glp = Math.round(this.glptemp);
    if( isNaN(this.glp))
    {
      return + "%" ;
    }
    else
    {
     return this.glp + "%" ;
  }
  }
  else{
    return 0 + "%";
  }
}

navToCompany(stock) {
  let data = { idCompany:stock.idCompany,idCompanyStock:stock.idCompanyStock };
  this._lstore.setLocalItem('company',data);
  // alert(stock.idCompany);
  this.router.navigate(['/userlanding', stock.idCompany])
  this.registerFormInit();
  this.getPrimaryActDetail();
  this.getSecondaryActDetail();
  this.limitFormInit();
  this.sellFormInit();
  this.getStoragesItem();
  this.getOrderBook();
  this.getmyTradeHistory();
  this.getTradeHistory();
  this.getOpenOrders();
  this.getFilledOrders();
  this.getAllOrders();
  this.getStockInfo();
  this.checkUserType(this.userType);
  this.getStockList();
}

searchTable(){
       var input, filter, table, tr, td, i;
       input = document.getElementById("filter");
       filter = input.value.toUpperCase();
       table = document.getElementById("miniMarketTable");
       tr = table.getElementsByTagName("tr");
       for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
}

deleteOrdershowLoader:boolean = false;

deleteOpenBuyOrder(){
  this.deleteOrdershowLoader = true;

  let data = {
    idUser: this.userId,
    idCompanyStock: this.tempCompanyIdStock,
    idBuyorder: this.tempBuyOrder
  };

  this._req.fetchApiData(this._urls.deleteOrderUrl,data).subscribe(
    (data:any) => {
        // console.log(data);
        this.deleteOrdershowLoader = false;
        let resSucc = data.data;
        let resErr = data.error;
        
        if( resSucc != '' ) {
          this.getOrderBook();
          this.getPrimaryActDetail();
          this.getmyTradeHistory();
          this.getTradeHistory();
          this.getOpenOrders();
          this.getFilledOrders();
          this.getAllOrders();
          this.modalClose();
          this.getStockList();
         
        }
       

    },
    error => {

    },
    () => {

    }
)


}


deleteOpenSellOrder(){
  this.deleteOrdershowLoader = true;
  let data = {
    idUser: this.userId,
    idCompanyStock: this.tempSellCompanyIdStock,
    idSellorder: this.tempSellOrder
  };

  this._req.fetchApiData(this._urls.deleteOrderUrl,data).subscribe(
    (data:any) => {
        // console.log(data);
        this.deleteOrdershowLoader = false;
        let resSucc = data.data;
        let resErr = data.error;
       
        if( resSucc != '' ) {
          this.getOrderBook();
          this.getPrimaryActDetail();
          this.getmyTradeHistory();
          this.getTradeHistory();
          this.getOpenOrders();
          this.getFilledOrders();
          this.getAllOrders();
          this.modalClose();
         
        }
        

    },
    error => {

    },
    () => {

    }
)


}







  ngOnInit() {
    this.scrollToTop();
    this.registerFormInit();
    this.getPrimaryActDetail();
    this.getSecondaryActDetail();
    this.limitFormInit();
    this.sellFormInit();
    this.getStoragesItem();
    this.getOrderBook();
    this.getmyTradeHistory();
    this.getTradeHistory();
    this.getOpenOrders();
    this.getFilledOrders();
    this.getAllOrders();
    this.getStockInfo();
    this.checkUserType(this.userType);
    this.getStockList();
  }

  ngOnDestroy() {
    this.removeStorage();
  }

}