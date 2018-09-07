import { Injectable } from '@angular/core';
import { HybseConfig } from '../../config/hybse.config';
import { ApiDataServices } from '../apiservices/api.services';

@Injectable()
export class IssuerregisterwizardService {

  constructor(public config:HybseConfig,public api:ApiDataServices) { }

    companyRegistrationUrl:string = this.config.apiURL+'companyRegistration';
    issuerDetailUrl:string = this.config.apiURL+'issuerDetail';

    company(data) {
        return this.api.postApiData(this.companyRegistrationUrl, data);
    }
    issuerDetail(data) {
        return this.api.postApiData(this.issuerDetailUrl, data);
    }

}
