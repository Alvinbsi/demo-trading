import { Directive, HostListener, OnInit, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[rippleEffect]'
})
export class RippleClickEffect implements OnInit {

  constructor(private el: ElementRef) { }

  @Input('rippleEffect') backGround: string;

  @HostListener('click', ['$event']) rippleClick(e) {
    console.log(e);
    let ele = this.el.nativeElement;
    let circle = document.createElement('div');
    circle.classList.add('ripple');
    console.log(document.querySelectorAll('ripple'));
    let d = Math.max(ele.clientWidth, ele.clientHeight);
    circle.style.width = circle.style.height = d + 'px';
    circle.style.left = e.clientX - ele.offsetLeft - d / 2 + 'px';
    circle.style.top = e.clientY - ele.offsetTop - d / 2 + 'px';

  }



  ngOnInit() { }

}
