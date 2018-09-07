import { Injectable } from '@angular/core';
import { HybseConfig } from '../../config/hybse.config';
import { ApiDataServices } from '../apiservices/api.services';

@Injectable()
export class CompanylistService {

  constructor(public config:HybseConfig,public api:ApiDataServices) { }

  companylistUrl:string = this.config.apiURL+'companyStockList';

}
