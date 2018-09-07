import { Injectable } from '@angular/core';
import { HybseConfig } from '../../config/hybse.config';


@Injectable()
export class ApiurlsService {

  constructor(public config:HybseConfig) { }

  /* User Api Urls */
  createUserUrl:string = this.config.apiURL+'createUser';
  adminListUrl:string = this.config.apiURL+'adminList';
  deleteUserUrl:string = this.config.apiURL+'deleteUser';
  getUserDataUrl:string = this.config.apiURL+'userDetailedView';
  updateUserUrl:string = this.config.apiURL+'updateUser';

  /* Login Api Urls */
  loginUrl:string = this.config.apiURL+'adminLogin';


  /* Company Api Urls */
  compListUrl:string = this.config.apiURL+'companyList';
  companyRegUrl:string = this.config.apiURL+'companyRegistration';

  activationUrl:string = this.config.apiURL+'accountActivation';
  tempEmailUpdateUrl:string = this.config.apiURL+'tmpEmailUpdate';


  getPageUrl:string = this.config.apiURL+'getContent';

  getOrderBookUrl:string = this.config.apiURL+'orderBook';
  pageListUrl:string = this.config.apiURL+'listContent';
  listMenuItemUrl:string = this.config.apiURL+'getMenuHierarchy';


  buyOrderUrl:string = this.config.apiURL+'buyOrder';
  sellOrderUrl:string = this.config.apiURL+'sellOrder';

  imageUploadUrl:string = this.config.apiURL+'imageUpload';

  getStockListUrl:string = this.config.apiURL+'stockList';
  getStockInfoUrl:string = this.config.apiURL+'stockInfo';

  getPrimaryActUrl:string = this.config.apiURL+'primaryAccountDetails';
  getSecondaryActUrl:string = this.config.apiURL+'secondaryAccountDetails';

  getTradeHistoryUrl:string = this.config.apiURL+'tradingHistory';

  updatePasswordUrl:string = this.config.apiURL+'passwordChange';
  updateEmailUrl:string = this.config.apiURL+'emailChange';
  updateProfileImageUrl:string = this.config.apiURL+'updateProfileimage';


  withdrawalUrl:string = this.config.apiURL+'withdraw';

  upgradeSilverUrl:string = this.config.apiURL+'verifySilver';
  upgradeGoldUrl:string = this.config.apiURL+'goldVerify';

  updateUserDetailsUrl:string = this.config.apiURL+'updateUserDetails';
  updateUserFinancialUrl:string = this.config.apiURL+'updateFinancialDetails';
  userDetailsUrl:string = this.config.apiURL+'userDetails';

  nemHistoryUrl:string = this.config.apiURL+'nemHistoryList';
  deleteOrderUrl:string = this.config.apiURL+'deleteOrder';
  getLocaleUrl:string = this.config.apiURL+'getLocale';

  userPreferenceUrl:string = this.config.apiURL+'userPreference';
  logoutUrl:string = this.config.apiURL+'Logout';
  logoutPreviousSessionUrl:string = this.config.apiURL+'logoutPreviousSession';


  forgotPasswordUrl:string = this.config.apiURL+'forgotPassword';
  resetPasswordUrl:string = this.config.apiURL+'resetPassword';

  ledgerDetailsUrl:string = this.config.apiURL+'ledgerDetails';
  idNowPersonalInfoUrl:string = this.config.apiURL+'idNowPersonalInfo';

  
}
