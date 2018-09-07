import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../../../services/utilities/menu.services';
import { SidebarComponent } from '../sidebar.component';

@Component({
  selector: 'hybse-issueradmin-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.css']
})
export class SubnavComponent extends SidebarComponent {

  constructor(public _ms:MenuService,public route: Router ) {
    super(_ms,route)
  }


  @Input() subMenu:any = [];
  @Input() sbLvl:number = 0;


  ngOnInit() {

  }

  ngOnChanges() {
    this.sbLvl = this.sbLvl + 1;
  }

}
