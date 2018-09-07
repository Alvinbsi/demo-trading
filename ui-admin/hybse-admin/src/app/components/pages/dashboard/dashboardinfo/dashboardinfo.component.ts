import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceIn } from 'ng-animate';

@Component({
  selector: 'hybse-admin-dashboardinfo',
  templateUrl: './dashboardinfo.component.html',
  styleUrls: ['./dashboardinfo.component.css'],
  animations: [
    trigger('bounceIn', [transition('* => *', useAnimation(bounceIn,{
      params: { timing: 3 }
    }))])
  ],
})
export class DashboardinfoComponent implements OnInit {
  bounceIn:any;
  constructor() { }

  ngOnInit() {
  }

}
