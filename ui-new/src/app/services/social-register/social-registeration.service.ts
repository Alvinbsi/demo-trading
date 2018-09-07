import { Injectable } from '@angular/core';
import { HybseConfig } from '../../config/hybse.config';
import { ApiDataServices } from '../apiservices/api.services';

@Injectable()
export class SocialRegisterationService {

    constructor(public config:HybseConfig,public api:ApiDataServices) { }

    createUserUrl:string = this.config.apiURL+'socialRegister';

    socialRegister(data) {
        return this.api.postApiData(this.createUserUrl, data);
    }


}