import { Pipe, PipeTransform } from '@angular/core';

declare var UAParser:any;

@Pipe({
  name: 'parseua'
})
export class ParseuaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let ua = UAParser(value);
    let parser:any = '';
    console.log(ua);
    if(args == 'browser') {
      parser = ua.browser.name;
    } else if(args == 'os') {
      parser = ua.os.name;
    } else {
      parser = '';
    }
    console.log('parser',parser);
    return parser;
  }

}
