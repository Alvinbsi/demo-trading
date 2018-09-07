import { Injectable } from '@angular/core';
import { ApiDataServices } from '../apiservices/api.services';



@Injectable()
export class ApirequestService {

  constructor(private api:ApiDataServices) { }


  fetchApiData(url, data, type = 'post') {
    return (type == 'post') ? this.api.postApiData(url, data) :
                              this.api.getApiData(url, data);
  }


}
