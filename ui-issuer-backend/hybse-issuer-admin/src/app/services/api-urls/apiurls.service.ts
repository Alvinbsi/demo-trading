import { Injectable } from '@angular/core';
import { HybseConfig } from '../../config/hybse.config';


@Injectable()
export class ApiurlsService {

  constructor(public config:HybseConfig) { }
  userDetailUrl:string = this.config.apiURL+'userDetails';
  compDetailUrl:string = this.config.apiURL+'companyDetail';

  companyInfoUrl:string = this.config.apiURL+'companyInformationUpdate';
  companyDescUrl:string = this.config.apiURL+'companyDescriptionUpdate';
  companyManagementUrl:string = this.config.apiURL+'companyManagementUpdate';
  addManagementUrl:string = this.config.apiURL+'addCompanyManagement';
  deleteManagementUrl:string = this.config.apiURL+'deleteCompanyManagement';
}
