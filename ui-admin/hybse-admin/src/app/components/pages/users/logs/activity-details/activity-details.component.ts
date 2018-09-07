import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'hybse-admin-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
    console.log(data);
   }

  ngOnInit() {
  }

}
