import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormArray,FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild,ElementRef,HostListener } from '@angular/core';
import { ApiDataServices } from '../../../services/apiservices/api.services';
import { UtilityService } from '../../../services/utilities/utilities.services';
import { ClockService } from '../../../services/clock/clock.service';
import { UserloginService } from '../../../services/login/userlogin.service';
import { StorageService } from '../../../services/localstorage/storage.service';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';


declare var $:any;
declare var grecaptcha:any;


@Component({
  selector: 'hybse-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit {

  constructor( private _utils: UtilityService,private _api:ApirequestService,private _urls: ApiurlsService) { }

  recaptchaStatus:boolean = false;
  captchaResponse:any;

sortAlphabetical:boolean = true;
sortprice:boolean = true;
sortglp:boolean = true;

sortAlphabet(n){
  this.sortAlphabetical = !this.sortAlphabetical;
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("marketTable");
  switching = true;

  dir = "asc";

  while (switching) {

    switching = false;
    rows = table.getElementsByTagName("TR");

    for (i = 1; i < (rows.length - 1); i++) {

      shouldSwitch = false;

      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];


      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {

          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {

      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
sortNumericprice(){
  this.sortprice = !this.sortprice;
}
sortNumericGlp(){
  this.sortglp = !this.sortglp;
}

sortNumberTmp(n){
  this.sortprice = !this.sortprice;
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("marketTable");
  switching = true;

  dir = "asc";

  while (switching) {

    switching = false;
    rows = table.getElementsByTagName("TR");

    for (i = 1; i < (rows.length - 1); i++) {

      shouldSwitch = false;

      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  // console.log("working");
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
gl:any;
gltemp:any;
glp:any;
glptemp:any;
glSign:any;
glpSign:any;
positiveInteger:boolean = true;
nuetralInteger:boolean = false;

getGainLossPercent(stock) {
  this.cp = stock.priceCurrent;
  this.op = stock.priceOpen;
    if(this.cp != 0 && this.op != 0 )
    {
    this.glptemp = ((this.cp - this.op)/this.op)*100 ;
    this.glp = Math.round(this.glptemp);
    this.glpSign = Math.sign(this.glp);
    if(this.glpSign == 0 ){
      this.nuetralInteger = true;
}
else{
  if(this.glSign == 1){
    this.positiveInteger = true;
}
else{
this.positiveInteger = false;
}
}
   
  
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

  scrollToTop() {
    this._utils.scrollToY(0,400,'easeInOutQuint');
  }

  ngOnInit() {
    this.scrollToTop();
    this.getStockList();
  }

}
