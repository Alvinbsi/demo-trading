import { Directive,Renderer2,ElementRef } from '@angular/core';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';


@Directive({
  selector: '[verticalscrollbar]'
})
export class VerticalscrollbarDirective {
  element:any;
  constructor(private ele:ElementRef,private scrollbar: MalihuScrollbarService,private render:Renderer2) {
    
  }

  ngAfterViewInit() {
    this.scrollbar.initScrollbar( this.ele.nativeElement , { axis: 'y', theme: 'minimal-dark' });
  }

  ngOnDestroy() {
    this.scrollbar.destroy(this.ele.nativeElement);
  }
}
