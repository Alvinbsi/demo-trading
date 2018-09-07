import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getfilehandle'
})
export class GetfilehandlePipe implements PipeTransform {


  private fileStackUrl:string = 'https://www.filestackapi.com/api/file/';
  transform(value: any, dl?: boolean,cache?:boolean): any {
    if(value != '') {
      let handle = value.substr(value.lastIndexOf('/') + 1);
      console.log(handle);
      return `${this.fileStackUrl}${handle}?dl=${dl}&cache=${cache}`;
    }
    return null;
  }

  constructor( ) { }

}
