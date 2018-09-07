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
declare const TradingView: any;
declare const Datafeeds: any;

@Component({
  selector: 'hybse-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {



  title = 'hybse';
  Mesg:string = '';
  Authenticate:boolean;
  UserId:string;
  FirstName:string;
  LastName:string;
  newReg:string;
  redirectId:string;
  storageKey = { user: 'user',Username: 'Username' ,userType: 'userType', userData:'userData' }


  showTime:any;
  cet:any;


  constructor(private _fb: FormBuilder,
    private _cS: ClockService,
    private router:Router,
    private _ls:UserloginService,
    private _lstore: StorageService,
    private _utils: UtilityService,
    private _urls: ApiurlsService,
    private _req: ApirequestService,
    private _api:ApirequestService
  ) {}


  getTime(){
    this._cS.clockService().subscribe(
      (data:any) => {
          this.cet = data;
          this.showClock();
       },
      error => {

      },
      () => {

      }
  )
  }
  currentDate:any = '';

  getDate(date) {
    var cdate = new Date(date);
    // alert(date);
    var d:any = cdate.getDate();
    var n:any = cdate.getMonth();
    var y:any = cdate.getFullYear();
    this.currentDate = d + "." + n + " " + y;
  }
  showClock() {

    var utcSeconds = this.cet;
    //alert(utcSeconds);
    var d = new Date(0);
    var ms = d.setUTCSeconds(utcSeconds);
    //ms += 360000;

    var date = this.getCETorCESTDate(ms);

    var h:any = date.getHours();
    var m:any = date.getMinutes();
    var s:any = date.getSeconds();
    var session = "";
      // if(h == 0){
      //     h = 12;
      // }
      // if(h > 12){
      //     h = h - 12;
      //     session = "PM";
      // }
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    this.showTime = h + ":" + m + ":" + s + " " + session;

    // console.log('Timer Working properly');

    setTimeout(()=>{
      this.cet = this.cet + 1;
      this.showClock();
    }, 1000);
  }

  getCETorCESTDate(ms) {
    var localDate = new Date(ms);
    var utcOffset = localDate.getTimezoneOffset();
    var cetOffset = utcOffset + 60;
    var cestOffset = utcOffset + 120;
    var cetOffsetInMilliseconds = cetOffset * 60 * 1000;
    var cestOffsetInMilliseconds = cestOffset * 60 * 1000;

    var cestDateStart = new Date();
    var cestDateFinish = new Date();
    var localDateTime = localDate.getTime();
    var cestDateStartTime;
    var cestDateFinishTime;
    var result;

    cestDateStart.setTime(Date.parse('29 March ' + localDate.getFullYear() + ' 02:00:00 GMT+0100'));
    cestDateFinish.setTime(Date.parse('25 October ' + localDate.getFullYear() + ' 03:00:00 GMT+0200'));

    cestDateStartTime = cestDateStart.getTime();
    cestDateFinishTime = cestDateFinish.getTime();

    if(localDateTime >= cestDateStartTime && localDateTime <= cestDateFinishTime) {
        result = new Date(localDateTime + cestOffsetInMilliseconds);
    } else {
        result = new Date(localDateTime + cetOffsetInMilliseconds);
    }

    return result;
  }



  scrollToRegister() {
    if($('.trip_lists').length>0) {
      let targetSec:any = $('.trip_lists').offset().top;
      this._utils.scrollToY(targetSec,400,'easeInOutQuint');
    }

  }


  loginForm:FormGroup;
  loginFormValidate:boolean = false;
  disableButton:boolean = false;

  loginFormInitialize() {
      this.loginForm = this._fb.group({
          'email': ['',[Validators.required,this.validateEmail]],
          'password': ['',[Validators.required]],
          'captchField': ['', [Validators.required]]


      },
          {updateOn: 'blur'}
      );
  }

  responseSuccess:boolean = false;

  validateEmail(input:FormControl) {
      let val = input.value;
      let regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!regex.test(val) && val != '' )  {
          return {
              emailInvalid: true
          }
      }
      return null;
  }

  showLoader:boolean = false;
  loginFormSubmit() {

      this.Mesg="";
      let loginData = this.loginForm.value;
      this.loginFormValidate = true;
      this.showLoader = true;
      if(this.loginForm.valid) {
          this.disableButton = true;
          let data = {
              email: loginData.email,
              password: loginData.password
                     };

          this._ls.registerUser(data).subscribe(
              (data:any) => {
                //   console.log('data',data);
                  let response = data;
                //   console.log('Response Data',response.data);
                  if(response.data == '') {
                      if( response.error != '' ){
                        this.showLoader = false;
                        this.disableButton = false;
                        this.Mesg=response.error['Error Description'];
                        this.responseSuccess = false;
                      }
                  } else {
                      this.showLoader = false;
                      this.responseSuccess = true;
                      this.Mesg='Login Success';
                      this.Authenticate=true;
                      this.UserId= response.data.username;
                      this.FirstName=response.data.Firstname;
                      this.LastName=response.data.Lastname;
                      this.newReg=response.data.newReg;
                      this.redirectId = response.data.id;
                      let userData = { id: response.data.idUser, Username: response.data.Username, sessionKey:  response.data.Key.sessionKey };
                        this._lstore.setLocalItem( this.storageKey.userData, userData );
                        this._lstore.setLocalItem(this.storageKey.user, response.data.idUser);
                        this._lstore.setLocalItem(this.storageKey.userType, response.data.userType);
                        let userType = this._lstore.getLocalItems(this.storageKey.userType);
                        this._lstore.storageVal.next(userType);
                      if(this.newReg == '1'){
                          this.router.navigate(['/issuerRegister/'+this.redirectId]);
                      }
                      else{
                      this.router.navigate(['/companylist']);
                  }
                  }

              },
                  error => {

              },
              () => {

              }
          );
      }
  }


  scrollToTop() {
    this._utils.scrollToY(0,400,'easeInOutQuint');
  }

  homeCarouselTicker() {
    $('#home_platin_ticker').carouselTicker();
    $('#home_platin_ticker_white').carouselTicker();
}


  
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
        setTimeout(()=>{ this.homeCarouselTicker(); },200);
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


bannerCarouselInit() {

  $('#bannerSlider').owlCarousel({
      margin:0,
      responsiveClass:true,
      dots: false,
      autoplay:true,
      autoplayTimeout:5000,
      loop: true,
      autoplayHoverPause:false,
      nav:true,
      // navText : ["<i class='fal fa-arrow-circle-left'></i>","<i class='fal fa-arrow-circle-right'></i>"],
      navText: false,
      mouseDrag: false,
      
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      responsive:{
          0:{
              items:1,
          },
          600:{
              items:1,
          },
          1000:{
              items:1,
          }
      }
  });
}

initiateFunction(){
  let userData = { id: 0 };
}



  ngOnInit() {
    this.initiateFunction();
    this.getTime();
    this.scrollToTop();
    this.Authenticate = false;
    this.loginFormInitialize();
    this.getStockList();
    this.bannerCarouselInit();
    var seed = this;
    setTimeout(()=>{
      
    grecaptcha.render('html_element', {
        'sitekey' : '6LfPeVQUAAAAADV8drwrsUZfiWzj0B4VV6BZ18oc',
        'callback' : function(res)  {
            if(res != '') {
             seed.loginForm.get('captchField').setValue('checked');
            }
         }

    });

   
},200)

    this.captchaResponse = grecaptcha.getResponse();
    if(this.captchaResponse.length != 0){
        this.recaptchaStatus = true;
    }
    else{
        this.recaptchaStatus = false;
    }  
  }

   

  

    // ngAfterViewInit() {
        // new TradingView.widget({
        //     "container_id": 'intraday_chart',
        //     "width": 980,
        //     "height": 610,
        //     "symbol": "NASDAQ:AAPL",
        //     "interval": "D",
        //     "theme": "Light",
        //     "style": "1",
        //     "locale": "en",
        //     "toolbar_bg": "#f1f3f6",
        //     "enable_publishing": false,
        //     "allow_symbol_change": true,
        //     "hideideas": true
        //   });

        //   new TradingView.widget({
        //     'container_id': 'intraday_chart',
        //     "height": 400,
        //     'autosize': true,
        //     'symbol': 'AAPL',
        //     'interval': '120',
        //     'timezone': 'exchange',
        //     'theme': 'Dark',
        //     'style': '1',
        //     'toolbar_bg': '#f1f3f6',
        //     'withdateranges': true,
        //     'hide_side_toolbar': false,
        //     'allow_symbol_change': true,
        //     'save_image': false,
        //     'hideideas': true,
        //     'studies': [
        //     'MASimple@tv-basicstudies' ],
        //     'show_popup_button': true,
        //     'popup_width': '1000',
        //     'popup_height': '650'
        //   });
        // setTimeout(()=>{
        //     // console.log('Datafeed',new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"));
        //     new TradingView.MediumWidget({
        //         "container_id": "intraday_chart",
        //         "theme": "Dark",
        //         "symbols": [
        //           [
        //             "BTC-USD",
        //             "BITFINEX:BTCUSD|1d"
        //           ]
        //         ],
        //         "loading_screen": { "foregroundColor": "#ff0", "backgroundColor": "#f00" },
        //         "greyText": "Quotes by",
        //         "gridLineColor": "#e9e9ea",
        //         "fontColor": "#83888D",
        //         "underLineColor": "#dbeffb",
        //         "trendLineColor": "#4bafe9",
        //         "datafeed": new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
        //         "library_path": "charting_library/",
        //         "width": "100%",
        //         "height": "400px",
        //         "locale": "in"
        //     });
        // },1000);


    // }
}

