import { Injectable } from '@angular/core';
import { HybseConfig } from '../../config/hybse.config';
import { ApiDataServices } from '../apiservices/api.services';

@Injectable()
export class UserloginService {

    constructor(public config:HybseConfig,public api:ApiDataServices) { }

    loginUrl:string = this.config.apiURL+'userLogin';
    userLoginStatus:boolean = false;
    registerUser(data) {
        return this.api.postApiData(this.loginUrl, data);
    }

}
