import { Component, OnInit } from '@angular/core';
import { ApiDataServices } from '../../../services/apiservices/api.services';
import { UtilityService } from '../../../services/utilities/utilities.services';
import { ClockService } from '../../../services/clock/clock.service';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../services/localstorage/storage.service';

declare var $:any;

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});

@Component({
  selector: 'hybse-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor( private _cS: ClockService,
     private _utils: UtilityService,
    private _req: ApirequestService,
    private router: Router,
    private _ar:ActivatedRoute,
    private _lstore:StorageService,
  private _urls: ApiurlsService ) { }


showTime:any;
allMenuList:any= [];
menuAliases:any = [];
pageList:any = [];
cet:any;
menuTypes:any = [];
primaryMenu:any = [];
userType:string = '';
headerMenu:any = [];
userTypedisplay:any = '';
isNoPic:boolean = true;


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

  getMenuItems() {
  this._req.fetchApiData(this._urls.listMenuItemUrl,{},'get').subscribe(
    (data:any) => {
      // console.log('MenuList',data);
      let resSucc = data.data;
      let resErr = data.error;
      // console.log('resSucc',resSucc);
      this.allMenuList = resSucc;
      this.getMenuTypes(this.allMenuList);

    },
    error => {

    },
    () => {

    }
  );
}

getMenuTypes(items) {
  if(items.length > 0) {
    items.forEach(menu => {
      if(this.menuTypes.indexOf(menu.menuName) == -1) this.menuTypes.push(menu.menuName);
    });
    // console.log('this.menuTypes',this.menuTypes);
    this.setMenuTypes();
  }
}




setMenuTypes() {
  let primaryMenuType = [];
  let headerMenuType = [];
    this.allMenuList.forEach(menu => {
    switch (menu.menuName) {
      case "Primary Menu":
        this.primaryMenu.push(menu);
        break;
      case "Header Menu543":
        this.headerMenu.push(menu);
        break;
      default:
        break;
    }
  });
  // console.log('primaryMenuType',this.primaryMenu);  console.log('headerMenuType',this.headerMenu);
}


  getAllPagesList() {
    this._req.fetchApiData(this._urls.pageListUrl,{},'get').subscribe(
      (data:any) => {
        // console.log(data);
        let resSucc = data.data;
        let resErr = data.error;
        if(resSucc != '') this.pageList = resSucc; this.getPageAliases(this.pageList);
        // console.log('this.pageList',this.pageList);
      },
      error => {

      },
      () => {

      }
    );
  }
  getPageAliases(page) {
    if(page.length > 0) {
      page.forEach(el => {
        this.menuAliases.push(el.alias);
      });
      // console.log(this.menuAliases);
    }
  }


  navToContent(menu) {
    if(this.menuAliases.indexOf(menu.url) > -1) {
      this.router.navigate(['/pages', menu.url]);
    } else {
      this.router.navigateByUrl(menu.url);
    }

  }





  issuerregisterHeader:boolean = false;
  userregisterHeader:boolean = false;
  profileHeader:boolean = false;
  loginHeader:boolean = false;
  userAccount:boolean = false;
  loginBtn:boolean = true;
  registerBtn:boolean = true;
  SymbolBtn:boolean = true;
  landingCheck:boolean = true;
  exchange:boolean = false;
  profile:boolean = false;
  wallet:boolean = false;
  HeaderBtn:boolean = true;
  userUpgradeHeader:boolean = false;
  issuerAccount:boolean = false;
  homeBtn:boolean = false;
  profileBtn:boolean = false;
  silver:boolean = false;
  gold:boolean = false;
  loginValue:any;
  isUserLoggedIn:boolean = false;
  

  setHeaderCond(name,name1) {
       this.loginValue = this._lstore.getLocalItems('isLogin');
      //  alert(this.loginValue);
       if ( this.loginValue == 1 ){
         this.isUserLoggedIn = true;
       }
       else{
         this.isUserLoggedIn = false;
       }

//        if(this.isUserLoggedIn == true){
//               alert('Logged In');
//        }
//        else{
//         alert('Logged Out');
//  }


    switch (name) {
      case '':
      if(this.isUserLoggedIn == true){
        this.profileHeader = true;
        this.landingCheck = false;
        this.exchange = false;
        this.profile = false;
        this.wallet = false;
        this.userDetails();
        
              }
     else{
      this.issuerregisterHeader = false;
      this.profileHeader = false;
      this.loginBtn = true;
      this.registerBtn = true;
      this.SymbolBtn = true;
      this.homeBtn = false;
     }
       
        break;

        case 'registration':
        this.issuerregisterHeader = false;
        this.profileHeader = false;
        this.loginBtn = true;
        this.registerBtn = false;
        this.SymbolBtn = false;
        this.homeBtn = false;
        break;

      case 'userregister':
        this.issuerregisterHeader = true;
        this.userAccount = true;
        this.issuerAccount = false;
        this.homeBtn = true;
        this.silver = false;
        this.gold = false;
        
        break;

      case 'issuer':
        this.issuerregisterHeader = true;
        this.userAccount = false;
        this.issuerAccount = true;
        this.homeBtn = true;
        this.silver = false;
        this.gold = false;
      break;

      case 'issuerRegister':
        this.issuerregisterHeader = true;
        this.userAccount = false;
        this.homeBtn = true;
        this.silver = false;
        this.gold = false;

      break;

      case 'login':
        this.loginHeader = true;
        this.loginBtn = false;
        this.registerBtn = true;
        this.SymbolBtn = false;
        this.homeBtn = false;
        
        break;

      case 'companylist':
      this.profileHeader = true;
      this.landingCheck = false;
      this.exchange = false;
      this.profile = false;
      this.wallet = false;
      this.userDetails();
      break;

      case 'userlanding':
        this.profileHeader = true;
        this.landingCheck = false;
        this.exchange = true;
        this.profile = false;
        this.wallet = false;
        this.userDetails();

        break;

        case 'companyHistory':
      this.profileHeader = true;
      this.landingCheck = false;
      this.exchange = false;
      this.profile = false;
      this.wallet = false;
      this.userDetails();
      break;



      case 'profile':
      this.issuerregisterHeader = false;
      this.profileHeader = true;
      this.landingCheck = false;
      this.profile = true;
      this.exchange = false;
      this.wallet = false; 
      this.homeBtn = false;
      this.silver = false;
      this.homeBtn = false;
      this.profileBtn = false;

      switch (name1) {

        case '' :
        this.issuerregisterHeader = false;
        this.profileHeader = true;
        this.landingCheck = false;
        this.profile = true;
        this.exchange = false;
        this.wallet = false; 
        this.homeBtn = false;
        this.silver = false;
        this.homeBtn = false;
        this.profileBtn = false;
        this.userDetails();
        break;

        case 'security' :
        this.issuerregisterHeader = false;
        this.profileHeader = true;
        this.landingCheck = false;
        this.profile = true;
        this.exchange = false;
        this.wallet = false; 
        this.homeBtn = false;
        this.silver = false;
        this.homeBtn = false;
        this.profileBtn = false;
        this.userDetails();      
        break;

        case 'settings' :
        this.issuerregisterHeader = false;
        this.profileHeader = true;
        this.landingCheck = false;
        this.profile = true;
        this.exchange = false;
        this.wallet = false; 
        this.homeBtn = false;
        this.silver = false;
        this.homeBtn = false;
        this.profileBtn = false;
        this.userDetails();      
        break;

        case 'verification-level' :
        this.issuerregisterHeader = false;
        this.profileHeader = true;
        this.landingCheck = false;
        this.profile = true;
        this.exchange = false;
        this.wallet = false; 
        this.homeBtn = false;
        this.silver = false;
        this.homeBtn = false;
        this.profileBtn = false;
        this.userDetails();    
        break;

        case 'silver':

        this.issuerregisterHeader = true;
        this.userAccount = false;
        this.issuerAccount = false;       
        this.silver = true;
        this.gold = false;
        this.homeBtn = false;
        this.profileBtn = true;
        break;

        case 'gold':

        this.issuerregisterHeader = true;
        this.userAccount = false;
        this.issuerAccount = false;
        this.silver = false;
        this.gold = true;
        this.homeBtn = false;
        this.profileBtn = true;
        break;
      }
      
      break;
       

      case 'wallet':
        this.profileHeader = true;
        this.landingCheck = false;
        this.wallet = true;
        this.exchange = false;
        this.profile = false;
        this.userDetails();
        break;

      case 'terms':
        this.profileHeader = false;
        this.HeaderBtn = false;
       
      break;

      case 'privacy':
      this.profileHeader = false;
      this.HeaderBtn = false;    
      break;
     
      default:
        break;
    }
  }



  checkUserType(type) {
    switch (type) {
      case 'Admin':

        break;
      case 'Issuer':

        break;
      default:
        break;
    }
  }

  dayThemeEnabled:boolean = true;
  toggle = false;
  

theme:any;
fontword:any;
fontwordInverse:any;
blueChange:any;


  toggleTheme(){

    this.dayThemeEnabled = !this.dayThemeEnabled;
    this.toggle = !this.toggle;


    this.theme        =   document.getElementById("theme_change"),
    this.fontword     =   document.getElementById("font_word");
    this.blueChange   =   document.getElementById("blueChange");

    this.theme.style.background = this.toggle? "#2f3032": "#f5f5f5";
    this.fontword.style.color = this.toggle? "white" : "black";
    this.blueChange.style.background_color = this.toggle? "#2f3032" : "#60c3e5";

  }

  issuerSettings:boolean = true;

  toggleDown(){
    this.issuerSettings = !this.issuerSettings;
  }

  currentRouteName:any = '';


  getStoragesItem() {

    let userType = this._lstore.getLocalItems('userType');
    if( userType != null ) {
      this.userTypedisplay = userType;
    }
    // console.log('this.companyInfo',company);
  }

  userEmail:any;
    getUserDetail(){
        let lsVal:any = this._lstore.getLocalItems('userData');
        lsVal == null ? ( lsVal = '') : (lsVal = JSON.parse(lsVal));
        this.userEmail = lsVal.Email;
    }

    secondaryRouteName:any;
    idUser:any;
    responseTempAvatar:any;
    responseAvatar:any;
    themeSelected:any;
    userDetails(){
      
      this.idUser = this._lstore.getLocalItems('user');
      this.theme        =   document.getElementById("theme_change");

      let data = {          idUser: this.idUser
      };
      this._req.fetchApiData(this._urls.userDetailsUrl,data).subscribe(
        (data:any) => {

          //  console.log('update',data);
           let response = data.data;

           this.themeSelected = response.preferredTheme;
           if(this.themeSelected == true ){
                                   this.theme.style.background = "#f5f5f5";
           }
           else{
                                   this.theme.style.background = "#2f3032";
           }
           this.responseTempAvatar = response.avatar;
           if(this.responseTempAvatar == 'N/A'){
                       this.isNoPic = true;      
           }
           else{
            this.isNoPic = false; 
            this.responseAvatar = this.responseTempAvatar;
           }},
           error => {
     
           },
           () => {
     
           })
       }

  logOut(){
                   let data = {    
                            idUser: this.idUser
                              };

                              this._req.fetchApiData(this._urls.logoutUrl,data).subscribe(
                                (data:any) => {
                                           this.router.navigate(['/']);
                                           localStorage.clear();
                                           this.issuerregisterHeader = false;
                                           this.profileHeader = false;
                                           this.loginBtn = true;
                                           this.registerBtn = true;
                                           this.SymbolBtn = true;
                                           this.homeBtn = false;
                                },
                                   error => {
                             
                                   },
                                   () => {
                             
                                   })                                                          
  }

  loginUserHeader(){
    localStorage.clear();
    this.issuerregisterHeader = true;
    this.userAccount = true;
    this.issuerAccount = false;
    this.homeBtn = true;
    this.silver = false;
    this.gold = false;
  }
  loginIssuerHeader(){
    localStorage.clear();
    this.issuerregisterHeader = true;
    this.userAccount = false;
    this.issuerAccount = true;
    this.homeBtn = true;
    this.silver = false;
    this.gold = false;
  }

  


  ngOnInit() {
      this.getTime();
      this.getAllPagesList();
      this.getStoragesItem();
      this.checkUserType(this.userTypedisplay);

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd ) {
          if(event.url != '') {
            let currentRoutes = event.url.split('/');
            
            this.currentRouteName = currentRoutes.shift();
            this.currentRouteName = currentRoutes[0];
            this.secondaryRouteName = currentRoutes[1];
            this.setHeaderCond(this.currentRouteName,this.secondaryRouteName);


          }
        }
      });
      this.getMenuItems();
      this.getUserDetail();
      this.userDetails();
      // this._lstore.storageVal.subscribe(
      //   data => {
      //     this.checkUserType(data);
      //   }
      // )
    }
}



