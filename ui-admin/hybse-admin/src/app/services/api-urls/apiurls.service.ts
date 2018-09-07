import { Injectable } from '@angular/core';
import { HybseConfig } from '../../config/hybse.config';


@Injectable()
export class ApiurlsService {

  constructor(public config:HybseConfig) { }

  /* Get Session Key */
  getSessionkeyUrl:string = this.config.apiURL+'getSessionkey';


  /* User Api Urls */
  //createUserUrl:string = this.config.apiURL+'createUser';
  createUserAdminUrl:string = this.config.apiURL+'adminRegister';
  createUserInvestorUrl:string = this.config.apiURL+'investorRegister';
  adminListUrl:string = this.config.apiURL+'adminList';
  deleteUserUrl:string = this.config.apiURL+'deleteUser';
  getUserDataUrl:string = this.config.apiURL+'userDetailedView';
  //updateUserUrl:string = this.config.apiURL+'updateUser';
  updateUserUrl:string = this.config.apiURL+'updateUser';
  updateAdminUrl:string = this.config.apiURL+'updateAdmin';
  updateInvestorUrl:string = this.config.apiURL+'updateInvestor';
  userActiveUrl:string = this.config.apiURL+'activeUser';
  userDetailsUrl:string = this.config.apiURL+'userDetails';
  userLoginDetailsUrl:string = this.config.apiURL+'userLoginDetails';


  /* Login Api Urls */
  loginUrl:string = this.config.apiURL+'adminLogin';


  /* Company Api Urls */
  compListUrl:string = this.config.apiURL+'companyList';
  compDetailUrl:string = this.config.apiURL+'companyDetail';
  companyUpdateUrl:string = this.config.apiURL+'companyUpdate';
  companyDeleteUrl:string = this.config.apiURL+'deleteCompany';
  companyActiveUrl:string = this.config.apiURL+'activeCompany';


  /* Page Category */
  pageCatListUrl:string = this.config.apiURL+'listContentCategory';
  pageCatCreateUrl:string = this.config.apiURL+'createContentCategory';
  pageCatUpdateUrl:string = this.config.apiURL+'updateContentCategory';
  pageCatDeleteUrl:string = this.config.apiURL+'deleteContentCategory';
  getpageCatUrl:string = this.config.apiURL+'getContentCategory';

  /* Page  */
  pageListUrl:string = this.config.apiURL+'listContent';
  pageCreateUrl:string = this.config.apiURL+'createContent';
  pageUpdateUrl:string = this.config.apiURL+'updateContent';
  pageDeleteUrl:string = this.config.apiURL+'deleteContent';
  getpageUrl:string = this.config.apiURL+'getContent';


  /* Menu  */
  createMenuUrl:string = this.config.apiURL+'createMenu';
  updateMenuUrl:string = this.config.apiURL+'updateMenu';
  deleteMenuUrl:string = this.config.apiURL+'deleteMenu';
  listAllMenuUrl:string = this.config.apiURL+'listAllMenu';


  /* Menu  Items */
  createMenuItems:string = this.config.apiURL+'createMenuItems';
  updateMenuItemsUrl:string = this.config.apiURL+'updateMenuItems';
  deleteMenuItemsUrl:string = this.config.apiURL+'deleteMenuItems';
  listAllMenuItemUrl:string = this.config.apiURL+'orderMenuHierarchy';
  listMenuItemUrl:string = this.config.apiURL+'getMenuItemsByName';



  /* Symbols */
  createSymbolUrl:string = this.config.apiURL+'createSymbol';
  updateSymbolUrl:string = this.config.apiURL+'updateSymbol';
  deleteSymbolUrl:string = this.config.apiURL+'deleteSymbol';
  listSymbolUrl:string = this.config.apiURL+'listSymbol';
  primarySymbolUrl:string = this.config.apiURL+'primarySymbol';

  /* Markets */
  createMarketUrl:string = this.config.apiURL+'createMarket';
  updateMarketUrl:string = this.config.apiURL+'updateMarket';
  deleteMarketUrl:string = this.config.apiURL+'deleteMarket';
  listMarketUrl:string = this.config.apiURL+'listMarket';
  marketDetailUrl:string = this.config.apiURL+'detailedMarket';


  /* Activities Log */
  activityLogsUrl:string = this.config.apiURL+'userActivityDetails';
  activityCodeUrl:string = this.config.apiURL+'activityCode';
  activityDetailsUrl:string = this.config.apiURL+'activityDetails';

  /* Locale */
  createLocaleUrl:string = this.config.apiURL+'createLocale';
  updateLocaleUrl:string = this.config.apiURL+'updateLocale';
  deleteLocaleUrl:string = this.config.apiURL+'deleteLocale';
  listLocaleUrl:string = this.config.apiURL+'getLocale';
  getLocaleByIdUrl:string = this.config.apiURL+'getLocaleone';

  /* Translation */
  createTranslationUrl:string = this.config.apiURL+'createTranslation';
  updateTranslationUrl:string = this.config.apiURL+'updateTranslation';
  deleteTranslationUrl:string = this.config.apiURL+'deleteTranslation';
  listTranslationUrl:string = this.config.apiURL+'translationList';
  getTranslationByIdUrl:string = this.config.apiURL+'getTranslationOne';

  /* Mail Template */
  createMessageTemplateUrl:string = this.config.apiURL+'createMessageTemplate';
  updateMessageTemplateUrl:string = this.config.apiURL+'updateMessageTemplate';
  deleteMessageTemplateUrl:string = this.config.apiURL+'deleteMessageTemplate';
  listMessageTemplateUrl:string = this.config.apiURL+'listMessageTemplate';
  getTemplateByIdUrl:string = this.config.apiURL+'detailedMessageTemplate';


  /* Log Out Api Urls */
  logOutUrl:string = this.config.apiURL+'Logout';
}
