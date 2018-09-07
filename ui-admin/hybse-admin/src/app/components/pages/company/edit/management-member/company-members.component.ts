import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hybse-admin-company-members',
  templateUrl: './company-members.component.html',
  styleUrls: ['./company-members.component.css']
})
export class CompanyMembersComponent implements OnInit {

  constructor() { }

  @Input() memberDetail:any = [];


  ngOnInit() {
  }


  ngOnChanges() {
    console.log('sdfdsf',this.memberDetail);
  }
}
