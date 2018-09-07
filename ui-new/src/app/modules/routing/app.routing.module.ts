import { GoldComponent } from './../../components/pages/profile/verification/gold/gold.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { IssuerRegisterComponent } from '../../components/pages/issuer-register/issuer-register.component';
import { IssuerRegisterWizardComponent } from '../../components/pages/issuer-register-wizard/issuer-register-wizard.component';
import { UserloginComponent } from '../../components/pages/userlogin/userlogin.component';
import { UserregisterComponent } from '../../components/pages/userregister/userregister.component';
import { AccountActivationComponent } from '../../components/pages/account-activation/account-activation.component';
import { UserlandingComponent } from '../../components/pages/userlanding/userlanding.component';
import { TestComponent } from '../../components/pages/test/test.component';

import { SocialLoginCallbackComponent } from '../../components/pages/social-login/social-login-callback.component';
import { HomepageComponent } from '../../components/pages/homepage/homepage.component';
import { ProfileComponent } from '../../components/pages/profile/profile.component';

import { SecurityComponent } from '../../components/pages/profile/security/security.component';
import { SettingsComponent } from '../../components/pages/profile/settings/settings.component';
import { VerificationComponent } from '../../components/pages/profile/verification/verification.component';
import { SilverComponent } from '../../components/pages/profile/verification/silver/silver.component';
import { CompanyListComponent } from '../../components/pages/company-list/company-list.component';
import { WalletComponent } from '../../components/pages/wallet/wallet.component';
import { BalanceComponent } from '../../components/pages/wallet/balance/balance.component';
import { HistoryComponent } from '../../components/pages/wallet/history/history.component';
import { OrdersComponent } from '../../components/pages/wallet/orders/orders.component';
import { MarketComponent } from '../../components/pages/wallet/market/market.component';

import { ContentPagesComponent } from '../../components/pages/content-pages/content-pages.component';
import { MarketsComponent } from '../../components/pages/markets/markets.component';

import { TermsComponent } from '../../components/common/terms/terms.component';
import { PrivacyComponent } from '../../components/common/privacy/privacy.component';

import { NewsComponent } from '../../components/pages/news/news.component';
import { LearningcenterComponent } from '../../components/pages/learningcenter/learningcenter.component';
import { SessionExpiredComponent } from '../../components/common/session-expired/session-expired.component';
import { AboutUsComponent } from '../../components/pages/about-us/about-us.component';
import { PressCenterComponent } from '../../components/pages/press-center/press-center.component';
import { LegalComponent } from '../../components/pages/legal/legal.component';
import { SupportComponent } from '../../components/pages/support/support.component';
import { SearchComponent } from '../../components/pages/search/search.component';
import { ContactComponent } from '../../components/pages/contact/contact.component';
import { CompanyDetailsComponent } from '../../components/pages/company-details/company-details.component';
import { RegistrationComponent } from '../../components/pages/registration/registration.component';
import { TmpEmailUpdateComponent } from '../../components/pages/tmp-email-update/tmp-email-update.component';
import { CompanyHistoryComponent } from '../../components/pages/company-history/company-history.component';
import { ForgotpasswordComponent } from '../../components/pages/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from '../../components/pages/reset-password/reset-password.component';
import { AuthenticationGuard } from '../../guards/auth.guards';



const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'news',  component: NewsComponent },
    { path: 'learning-center', component: LearningcenterComponent },
    { path: 'issuer', component: IssuerRegisterComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'press-center', component: PressCenterComponent },
    { path: 'legal', component: LegalComponent },
    { path: 'support', component: SupportComponent },
    { path: 'search', component: SearchComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'companylist',  component: CompanyListComponent },
    { path: 'company-detail', component: CompanyDetailsComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'issuerRegister', component: IssuerRegisterWizardComponent },
    { path: 'issuerRegister/:id', component: IssuerRegisterWizardComponent },
    { path: 'login', component: UserloginComponent },
    { path: 'forgotPassword', component: ForgotpasswordComponent },
    { path: 'resetPassword', component: ResetPasswordComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'sessionexpired', component: SessionExpiredComponent },
    { path: 'userregister', component: UserregisterComponent },
    { path: 'accountActivation', component: AccountActivationComponent },  
    { path: 'tmpEmailUpdate', component: TmpEmailUpdateComponent },
    { path: 'userlanding', component: UserlandingComponent },
    { path: 'userlanding/:id', component: UserlandingComponent },
    { path: 'markets', component: MarketsComponent },
    { path: 'test', component: TestComponent },
    { path: 'slcallback', component: SocialLoginCallbackComponent },
    { path: 'pages', component: ContentPagesComponent },
    { path: 'pages/:alias', component: ContentPagesComponent },
    { path: 'companyHistory',component: CompanyHistoryComponent },
    { path: 'profile',component: ProfileComponent, children:[
      { path: '', redirectTo:'/profile/security',pathMatch: 'full' },
        { path: 'security', component: SecurityComponent },
        { path: 'settings', component: SettingsComponent },
        { path: 'verification-level',component: VerificationComponent},
        { path: 'silver', component: SilverComponent },
        { path: 'gold', component: GoldComponent }
      ]
    },
    { path: 'wallet', component: WalletComponent, children:[
      { path: '', redirectTo:'/wallet/balance',pathMatch: 'full' },
      { path: 'balance', component: BalanceComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'market',component: MarketComponent }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})
export class HybseRoutingModule { }
