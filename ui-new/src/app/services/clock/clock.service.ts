import { Injectable } from '@angular/core';
import { HybseConfig } from '../../config/hybse.config';
import { ApiDataServices } from '../apiservices/api.services';


@Injectable()
export class ClockService {

  constructor(public config:HybseConfig,public api:ApiDataServices) { }

  clockUrl:string = this.config.apiURL+'cetTime';

  clockService() {
    return this.api.getApiData(this.clockUrl);
}

}
