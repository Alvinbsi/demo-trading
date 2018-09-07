import { Component, OnInit } from '@angular/core';
import { ViewChild,ElementRef,HostListener } from '@angular/core';
import { ApiDataServices } from '../../../services/apiservices/api.services';
import { UtilityService } from '../../../services/utilities/utilities.services';
import { CompanylistService } from '../../../services/company-lists/companylist.service';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';
import { StorageService } from '../../../services/localstorage/storage.service';

@Component({
  selector: 'hybse-company-history',
  templateUrl: './company-history.component.html',
  styleUrls: ['./company-history.component.css']
})
export class CompanyHistoryComponent implements OnInit {
  constructor(private _api:ApirequestService,
    private _urls: ApiurlsService,
    private _lstore: StorageService,
    private route: Router,
    private _utils: UtilityService,
    private _req: ApirequestService
    ) { }

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

 getGainLoss(stock) {


   this.cp = stock.price;
   this.op = stock.oldPrice;
   this.gltemp = this.cp - this.op;
   this.gl = Math.round(this.gltemp);
   this.glSign = Math.sign(this.gl);
   if(this.glSign == 1){
     this.positiveInteger = true;
}
else{
this.positiveInteger = false;
}
   if(this.cp != 0 && this.op != 0 ){
   if( isNaN(this.gl))
   {
     return ;
   }
   else
   {
    return this.gl ;
 }
}
else{
 return 0;
}


 }


 getGainLossPercent(stock) {
   this.cp = stock.price;
   this.op = stock.oldPrice;
   if(this.cp != 0 && this.op != 0 )
   {
   this.glptemp = ((this.cp - this.op)/this.op)*100 ;
   this.glp = Math.round(this.glptemp);
   this.glpSign = Math.sign(this.glp);
   if(this.glSign == 1){
     this.positiveInteger = true;
 }
 else{
 this.positiveInteger = false;
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



 navToCompany(stock) {
   let data = { idCompany:stock.idCompany,idCompanyStock:stock.idCompanyStock };
   this._lstore.setLocalItem('company',data);
   this.route.navigate(['/userlanding', stock.idCompany])
 }

 scrollToTop() {
   this._utils.scrollToY(0,400,'easeInOutQuint');
 }

 primaryDetail:any = [];
 secondaryDetail:any = [];
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


 sortAlphabetical:boolean = true;
 sortprice:boolean = true;
 sortlastprice:boolean = true;
 sortopenprice:boolean = true;
 sorthigh:boolean = true;
 sortlow:boolean = true;
 sortvolume:boolean = true;
 sortgl:boolean = true;
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
 sortNumericLastprice(){
   this.sortlastprice = !this.sortlastprice;
 }
 sortNumericOpenprice(){
   this.sortopenprice = !this.sortopenprice;
 }
 sortNumericHigh(){
   this.sorthigh = !this.sorthigh;
 }
 sortNumericLow(){
   this.sortlow = !this.sortlow;
 }
 sortNumericVolume(){
   this.sortvolume = !this.sortvolume;
 }
 sortNumericGl(){
   this.sortgl = !this.sortgl;
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


 ngOnInit() {
   this.scrollToTop();
   this.getStockList();
  this.getPrimaryActDetail();
   this.getSecondaryActDetail();

     }
}



