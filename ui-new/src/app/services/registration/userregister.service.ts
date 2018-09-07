import { Injectable } from '@angular/core';
import { HybseConfig } from '../../config/hybse.config';
import { ApiDataServices } from '../apiservices/api.services';

@Injectable()
export class UserregisterService {

    constructor(public config:HybseConfig,public api:ApiDataServices) { }

    createUserUrl:string = this.config.apiURL+'investorRegister';

    user(data) {
        return this.api.postApiData(this.createUserUrl, data);
    }


}