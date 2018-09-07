import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxStepperModule } from 'ngx-stepper';





/* Components */
import { AppComponent } from './app.component';

/* Services */
import { UtilityService } from './services/utilities/utilities.services';
import { ApiDataServices } from './services/apiservices/api.services';
import { ApirequestService } from './services/apirequest/apirequest.service';
import { ApiurlsService } from './services/api-urls/apiurls.service';
import { IssuerregisterService } from './services/registration/issuerregister.service';
import { IssuerregisterwizardService } from './services/registration/issuerregisterwizard.service';
import { UserregisterService } from './services/registration/userregister.service';
import { UserloginService } from './services/login/userlogin.service';
import { SocialRegisterationService } from './services/social-register/social-registeration.service';
import { CompanylistService } from './services/company-lists/companylist.service';
import { ClockService } from './services/clock/clock.service';
import { LanderpageService } from './services/landingpage/landerpage.service';


/* Pipes */
import { ObjNgForPipe } from './pipes/objNgFor/objNgFor.pipe';

/* Application Routing Module */
import { HybseRoutingModule } from './modules/routing/app.routing.module';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Angular Formwizard library


/* Configuration */
import { HybseConfig } from './config/hybse.config';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/common/header/header.component';
import { IssuerRegisterComponent } from './components/pages/issuer-register/issuer-register.component';
import { IssuerRegisterWizardComponent } from './components/pages/issuer-register-wizard/issuer-register-wizard.component';
import { UserloginComponent } from './components/pages/userlogin/userlogin.component';
import { UserregisterComponent } from './components/pages/userregister/userregister.component';
import { AccountActivationComponent } from './components/pages/account-activation/account-activation.component';
import { UserlandingComponent } from './components/pages/userlanding/userlanding.component';
import { TestComponent } from './components/pages/test/test.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';

import { FacebookModule } from 'ngx-facebook';
import { LinkedInSdkModule } from 'angular-linkedin-sdk';

import { SocialLoginCallbackComponent } from './components/pages/social-login/social-login-callback.component';
import { ApploaderComponent } from './components/common/apploader/apploader.component';
import { SecurityComponent } from './components/pages/profile/security/security.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { SettingsComponent } from './components/pages/profile/settings/settings.component';
import { VerificationComponent } from './components/pages/profile/verification/verification.component';
import { SilverComponent } from './components/pages/profile/verification/silver/silver.component';
import { GoldComponent } from './components/pages/profile/verification/gold/gold.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CompanyListComponent } from './components/pages/company-list/company-list.component';
import { WalletComponent } from './components/pages/wallet/wallet.component';
import { BalanceComponent } from './components/pages/wallet/balance/balance.component';
import { HistoryComponent } from './components/pages/wallet/history/history.component';
import { OrdersComponent } from './components/pages/wallet/orders/orders.component';
import { MarketComponent } from './components/pages/wallet/market/market.component';
import { ContentPagesComponent } from './components/pages/content-pages/content-pages.component';
import { MarketsComponent } from './components/pages/markets/markets.component';
import { StorageService } from './services/localstorage/storage.service';
import { TermsComponent } from './components/common/terms/terms.component';
import { PrivacyComponent } from './components/common/privacy/privacy.component';
import { NewsComponent } from './components/pages/news/news.component';
import { LearningcenterComponent } from './components/pages/learningcenter/learningcenter.component';
import { SessionExpiredComponent } from './components/common/session-expired/session-expired.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { PressCenterComponent } from './components/pages/press-center/press-center.component';
import { SupportComponent } from './components/pages/support/support.component';
import { SearchComponent } from './components/pages/search/search.component';
import { LegalComponent } from './components/pages/legal/legal.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { CompanyDetailsComponent } from './components/pages/company-details/company-details.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { TradingChartsComponent } from './components/pages/trading-charts/trading-charts.component';
import { TmpEmailUpdateComponent } from './components/pages/tmp-email-update/tmp-email-update.component';
import { CompanyHistoryComponent } from './components/pages/company-history/company-history.component';
import { ForgotpasswordComponent } from './components/pages/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { AuthenticationGuard } from './guards/auth.guards';






@NgModule({
  declarations: [
  	ObjNgForPipe,
    AppComponent,
    HeaderComponent,
    IssuerRegisterComponent,
    IssuerRegisterWizardComponent,
    UserloginComponent,
    UserregisterComponent,
    AccountActivationComponent,
    UserlandingComponent,
    TestComponent,
    HomepageComponent,
    SocialLoginCallbackComponent,
    ApploaderComponent,
    SecurityComponent,
    ProfileComponent,
    SettingsComponent,
    VerificationComponent,
    SilverComponent,
    GoldComponent,
    FooterComponent,
    CompanyListComponent,
    WalletComponent,
    BalanceComponent,
    HistoryComponent,
    OrdersComponent,
    MarketComponent,
    ContentPagesComponent,
    MarketsComponent,
    TermsComponent,
    PrivacyComponent,
    NewsComponent,
    LearningcenterComponent,
    SessionExpiredComponent,
    AboutUsComponent,
    PressCenterComponent,
    SupportComponent,
    SearchComponent,
    LegalComponent,
    ContactComponent,
    CompanyDetailsComponent,
    RegistrationComponent,
    TradingChartsComponent,
    TmpEmailUpdateComponent,
    CompanyHistoryComponent,
    ForgotpasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    FacebookModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HybseRoutingModule,
    HttpClientModule,
    NgxStepperModule,
    LinkedInSdkModule



  ],
  providers: [
    //{ provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: 'apiKey', useValue: '81at25qgit2qu8' },
    { provide: 'authorize', useValue: 'true' },
    HybseConfig,
    UtilityService,
    ApiDataServices,
    ApirequestService,
    ApiurlsService,
    IssuerregisterService,
    IssuerregisterwizardService,
    SocialRegisterationService,
    AuthenticationGuard,
    UserregisterService,
    UserloginService,
    CompanylistService,
    ClockService,
    LanderpageService,
    StorageService,
  ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { 
  
}

