import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'hybse-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {
  constructor(private router: Router){}
 
  issuerregisterHeader:boolean = false;
  userregisterHeader:boolean = false;
  profileHeader:boolean = false;
  loginHeader:boolean = false;
  userAccount:boolean = false;
  loginBtn:boolean = true;
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

  currentRouteName:any = '';
  secondaryRouteName:any = '';

  upgradeLevel:boolean = true;

  setHeaderCond(name,name1) {
    switch (name) {
      case '':
        this.issuerregisterHeader = false;
        this.profileHeader = false;
        this.loginBtn = true;
        this.homeBtn = false;
        this.upgradeLevel = true;

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
        this.upgradeLevel = true;

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
          this.upgradeLevel = true;

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
          this.upgradeLevel = true;

         
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
          this.upgradeLevel = true;

        
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
          this.upgradeLevel = true;

         
  
          break;
  
          case 'silver':
  
          this.issuerregisterHeader = true;
          this.userAccount = false;
          this.issuerAccount = false;
         
          this.silver = true;
          this.gold = false;
  
          this.homeBtn = false;
          this.profileBtn = true;
          this.upgradeLevel = false;

  
          break;
  
          case 'gold':
  
          this.issuerregisterHeader = true;
          this.userAccount = false;
          this.issuerAccount = false;
          this.silver = false;
          this.gold = true;
  
          this.homeBtn = false;
          this.profileBtn = true;
          this.upgradeLevel = false;

  
          break;
        }

        break;
      
      
      
      }

  }
  ngOnInit() {

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

  }

}
