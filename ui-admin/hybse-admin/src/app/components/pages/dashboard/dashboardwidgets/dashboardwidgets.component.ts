import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'ng-animate';


@Component({
  selector: 'hybse-admin-dashboardwidgets',
  templateUrl: './dashboardwidgets.component.html',
  styleUrls: ['./dashboardwidgets.component.css'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation(fadeInDown,{
      params: {
        timing: 1,
        a: '-50px'
      }
    }))])
  ]
})
export class DashboardwidgetsComponent implements OnInit {
  fadeInDown:any;
  constructor() { }

  ngOnInit() {
  }

}
