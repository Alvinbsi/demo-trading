
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from './../../../../services/localstorage/storage.service';
import { ApirequestService } from './../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from './../../../../services/api-urls/apiurls.service';
import { ViewChild,ElementRef,HostListener } from '@angular/core';
import { ApiDataServices } from './../../../../services/apiservices/api.services';
import { UtilityService } from './../../../../services/utilities/utilities.services';
import { CompanylistService } from './../../../../services/company-lists/companylist.service';
import { FormGroup, FormArray,FormControl, FormBuilder, Validators } from '@angular/forms';




@Component({
  selector: 'hybse-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  constructor(
    private _urls:ApiurlsService,
    private _req: ApirequestService,
    private _lstore: StorageService,
    private _api:ApirequestService,
    private route: Router,
    private _fb: FormBuilder,
    public _utils:UtilityService

  ) { }

  primaryDetail:any = [];
  secondaryDetail:any = [];
  ledgerDetail:any = [];
  primaryAccount:any;
  primarySymbol:any;
  message:any;
  idUser:any;

  Mesg:string = '';
  showLoader:boolean = false;
  responseSuccess:boolean = false;
  secondaryMesg:string = '';
  secondaryShowLoader:boolean = false;
  secondaryResponseSuccess:boolean = false;

  disableButton:boolean = false;
  secondarydisableButton:boolean = false;

  secondaryAccount:any;
  secondarySymbol:any;

  stockList:any = [];
  stockListError:string = '';

  depositForm:FormGroup;
  withdrawalForm:FormGroup;

  idCompanyStock:any="";

  withdrawalFormValidate:boolean=false;
  secondarywithdrawalFormValidate:boolean=false;
  
  secondaryDepositForm:FormGroup;
  secondaryWithdrawalForm:FormGroup;

  idSecondaryCompanyStock:any="";
  responsenemAddress:any;

  availableAmount:any;
  SecondaryavailableAmount:any;

  getPrimaryActDetail() {
    let userId = this._lstore.getLocalItems('user');
    if(userId != null) {
      let data = { idUser: userId };
      // let data = { idUser: 150 };
      this._req.fetchApiData( this._urls.getPrimaryActUrl, data ).subscribe(
        (data:any) => {
          // console.log('data',data)
          let resSucc = data.data;
          let resErr = data.error;

          if(resSucc != '') {
            this.primaryDetail = resSucc;
            this.primaryAccount = this.primaryDetail[0].totalAmount;
            this.primarySymbol = this.primaryDetail[0].symbol;
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


  getSecondaryActDetail() {
    let userId = this._lstore.getLocalItems('user');
    if(userId != null) {
      let data = { idUser: userId };
      // let data = { idUser: 150 };
      this._req.fetchApiData( this._urls.getSecondaryActUrl, data ).subscribe(
        (data:any) => {
          // console.log('data',data)
          let resSucc = data.data;
          let resErr = data.error;

          if(resSucc != '') {
            this.secondaryDetail = resSucc;
            this.secondaryAccount = this.secondaryDetail[0].totalAmount;
            this.secondarySymbol = this.secondaryDetail[0].symbol;
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


  navToCompany(stock) {
    let data = { idCompany:stock.idCompany,idCompanyStock:stock.idCompanyStock, };
    this._lstore.setLocalItem('company',data);
    this.route.navigate(['/userlanding', stock.idCompany]);
  }

 


  depositFormInitialize(){
    this.depositForm = this._fb.group({
      'message': ['',[Validators.required]],
       'walletAddress': ['TCYKBOKL3OHIFODC7IYG3ZT6YBYMBO64FOZSVSPM',[Validators.required]]           //Staging Server
        // 'walletAddress': ['TBQULJWHPZVZN77PZWKDLQYH75WUTO7NITSEDBFC',[Validators.required]]           // Dev Server

  },
      {updateOn: 'blur'}
  );
  }

  depositFormSubmit(){
    let depositData = this.depositForm.value;
    let data = {
      message: depositData.message,
      walletAddress: depositData.walletAddress,
             };  
             this.getPrimaryActDetail();  
             this.getSecondaryActDetail(); 
  }

  secondaryDepositFormInitialize(){
    this.secondaryDepositForm = this._fb.group({
      'message': ['',[Validators.required]],
       // 'walletAddress': ['TCYKBOKL3OHIFODC7IYG3ZT6YBYMBO64FOZSVSPM',[Validators.required]]           //Staging Server
        'walletAddress': ['TBQULJWHPZVZN77PZWKDLQYH75WUTO7NITSEDBFC',[Validators.required]]           // Dev Server
  },
      {updateOn: 'blur'}
  );
  }

getAssetName(idCompanyStock,availableAmount){
    this.idCompanyStock = idCompanyStock;
    this.availableAmount = availableAmount;
// alert(idCompanyStock);
// alert(availableAmount);

if ( availableAmount < 0 ) {
     this.disableButton = true;
     this.responseSuccess = false;
     this.Mesg='Insufficient Funds';
}

else{
  this.disableButton = false;
  this.Mesg='';

}

}

getsecondaryAssetName(idSecondaryCompanyStock,SecondaryavailableAmount){
  this.idSecondaryCompanyStock = idSecondaryCompanyStock;
  this.SecondaryavailableAmount = SecondaryavailableAmount;
  if ( SecondaryavailableAmount <= 0 ) {
    this.secondarydisableButton = true;
    this.secondaryResponseSuccess = false;
    this.secondaryMesg='Insufficient Funds';
}

else{
 this.secondarydisableButton = false;
 this.Mesg='';

}
}

setDepositFormVal() {
  let lsVal:any = this._lstore.getLocalItems('userData');
  lsVal == null ? ( lsVal = '') : (lsVal = JSON.parse(lsVal));
  // console.log('lsVal',lsVal);
  this.depositForm.patchValue({
    message: lsVal.Username
  });
  // alert(lsVal.id);
  this.withdrawalForm.patchValue({
    // message: lsVal.Username,
    idUser: lsVal.id
  });

  this.secondaryDepositForm.patchValue({
    message: lsVal.Username
  });
  // alert(lsVal.id);
  this.secondaryWithdrawalForm.patchValue({
    // message: lsVal.Username,
    idUser: lsVal.id
  });


  // console.log('Check',this.idUser);

}




  withdrawalFormInitialize(){
    this.withdrawalForm = this._fb.group({
      'message': [],
      'walletAddress': [],
      'amount': ['',[Validators.required,this.validateNumberDecimal]], 
       'idUser': []
     
  },
      {updateOn: 'blur'}
  );
  } 


  secondaryWithdrawalFormInitialize(){
    this.secondaryWithdrawalForm = this._fb.group({
      'message': [],
      'walletAddress': [],
      'amount': ['',[Validators.required,this.validateNumberDecimal]], 
       'idUser': []
  },
      {updateOn: 'blur'}
  );
  } 


  getUserDetails(){
    this.idUser = this._lstore.getLocalItems('user');
    let data = { idUser: this.idUser };

 this._req.fetchApiData(this._urls.userDetailsUrl,data).subscribe(
      (data:any) => {
        //  console.log('update',data);
         let response = data.data;
         this.responsenemAddress = response.nemAddress;
 })
  }




  
  

  withdrawalFormSubmit(){

   
          
        this.withdrawalFormValidate=true;
        this.showLoader = true;
        this.disableButton = true;
    
        let withdrawalData = this.withdrawalForm.value;
        let data = {
    
          message: withdrawalData.message,
          walletAddress: this.responsenemAddress,
          amount:withdrawalData.amount,
          idUser:withdrawalData.idUser,
          idCompanyStock:this.idCompanyStock
    
    
                 };
                 this._req.fetchApiData(this._urls.withdrawalUrl,data).subscribe(
                  (data:any) => {
                    this.idCompanyStock = "";   
                    this.showLoader = true;
                    this.disableButton = false;
                    let response = data;
                    // console.log('response',data);
                    if(response.data == '') {
                                          this.showLoader = false;
    
                     if( response.error != '' ){
                       this.showLoader = false;
                       this.disableButton = false;
                       this.Mesg=response.error['Error Description'];
                      //  console.log(this.Mesg);
                       this.responseSuccess = false;
                       this.withdrawalForm.reset();
    
                     }
                     
                 }
                 else{
                   this.showLoader = false;
                   this.disableButton = false;
                   this.Mesg='Trascation Successfull';
                  //  console.log(this.Mesg);
                   this.responseSuccess = true;
                   this.withdrawalForm.reset();     
                   this.getPrimaryActDetail();
                   this.getSecondaryActDetail();
                 }                 
                  },
                  error => {
            
                  },
                  () => {
            
                  })

                
       }





    
   

    secondaryWithdrawalFormSubmit(){
    
      this.secondarywithdrawalFormValidate=true;
      this.secondaryShowLoader = true;
      this.secondarydisableButton = true;
   

    let secondaryWithdrawalData = this.secondaryWithdrawalForm.value;
    let data = {

      message: secondaryWithdrawalData.message,
      walletAddress: this.responsenemAddress,
      amount:secondaryWithdrawalData.amount,
      idUser:secondaryWithdrawalData.idUser,
      idCompanyStock:this.idSecondaryCompanyStock
             };
             
             this._req.fetchApiData(this._urls.withdrawalUrl,data).subscribe(
              (data:any) => {
                 this.idCompanyStock = "";   
                 this.secondaryShowLoader = true;
                 this.secondarydisableButton = false;

                 let response = data;
                //  console.log('response',data);

                 if(response.data == '') {
                                      this.secondaryShowLoader = false;

                  if( response.error != '' ){
                    this.secondaryShowLoader = false;
                    this.secondarydisableButton = false;
                    this.secondaryMesg=response.error['Error Description'];
                    // console.log(this.secondaryMesg);
                    this.secondaryResponseSuccess = false;
                    this.secondaryWithdrawalForm.reset();

                  }
                  
              }

              else{
                this.secondaryShowLoader = false;
                this.secondarydisableButton = false;
                this.secondaryMesg='Trascation Successfull';
                // console.log(this.secondaryMesg);
                this.secondaryResponseSuccess = true;
                this.secondaryWithdrawalForm.reset();
                this.getPrimaryActDetail();
                this.getSecondaryActDetail();
              }


                
             
              },
              error => {
        
              },
              () => {
        
              })
            }      
  




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

copyText:any = 'copy';
copyAddress(element){
  element.select();
  document.execCommand('copy');
  this.copyText = 'Copied';
  setTimeout(()=>{ this.copyText ='Copy'; },2000);
}

copyText1:any = 'copy';
copyAddress1(element1){
  element1.select();
  document.execCommand('copy');
  this.copyText = 'Copied';
  setTimeout(()=>{ this.copyText ='Copy'; },2000);
}

getLedger(){
  this.idUser = this._lstore.getLocalItems('user');

               let data = {   
                              idUser: this.idUser
                          };
                          this._req.fetchApiData(this._urls.ledgerDetailsUrl,data).subscribe(
                            (data:any) => {

                              let resSucc = data.data;
                              let resErr = data.error;
                    
                              if(resSucc != '') {
                                this.ledgerDetail = resSucc;
                                
                              }
                    
                              if(resErr != '') {
                                
                              }
                              
                            },
                            error => {
                      
                            },
                            () => {
                      
                            })
}



  ngOnInit() {
    this.scrollToTop();
    this.getPrimaryActDetail();
    this.getSecondaryActDetail();
    this.getStockList();
    this.depositFormInitialize();
    this.withdrawalFormInitialize();
    this.secondaryDepositFormInitialize();
    this.secondaryWithdrawalFormInitialize();
    this.setDepositFormVal();
    this.getUserDetails();
    this.getLedger();

    // this.testNode()
  }

}
