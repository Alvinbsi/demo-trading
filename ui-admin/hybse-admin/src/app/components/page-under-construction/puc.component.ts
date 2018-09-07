import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'ng-animate';


@Component({
  selector: 'hybse-admin-puc',
  templateUrl: './puc.component.html',
  styleUrls: ['./puc.component.css'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation( fadeInDown,{
      params: {
        timing: 1,
        a: '-10px'
      }
    }))])
  ],
})
export class PucComponent implements OnInit {
  fadeInDown:any;
  constructor() { }

  ngOnInit() {
  }

}
