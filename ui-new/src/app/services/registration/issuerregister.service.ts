import { Injectable } from '@angular/core';
import { HybseConfig } from '../../config/hybse.config';
import { ApiDataServices } from '../apiservices/api.services';

@Injectable()
export class IssuerregisterService {

  constructor(public config:HybseConfig,public api:ApiDataServices) { }

    RegistrationUrl:string = this.config.apiURL+'issuerRegistration';

    registerUser(data) {
        return this.api.postApiData(this.RegistrationUrl, data);
    }

}
