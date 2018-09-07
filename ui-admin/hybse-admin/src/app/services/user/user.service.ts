import { Injectable } from '@angular/core';
import { HybseConfig } from '../../config/hybse.config';
import { ApiDataServices } from '../apiservices/api.services';



@Injectable()
export class UserService {

  constructor(public config:HybseConfig,public api:ApiDataServices) { }


}
