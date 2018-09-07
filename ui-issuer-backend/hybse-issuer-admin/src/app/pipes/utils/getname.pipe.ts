import { Pipe, PipeTransform } from '@angular/core';
import { UtilityService } from '../../services/utilities/utilities.services';



@Pipe({
  name: 'getname'
})
export class GetnamePipe implements PipeTransform {

  constructor( ) { }

  transform(value: any, arr?:any,match?:any,getProp?:any): any {
    let prop = arr.filter((item) => {
      return item[match] == value;
    });
    return prop[0] != undefined ? prop[0][getProp] : '';
  }

}
