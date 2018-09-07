import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../../interface/menu.interface';
import { SidenavComponent } from '../sidenav.component';
import { MenuService } from '../../../../services/utilities/menu.services';

@Component({
  selector: 'hybse-admin-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.css']
})
export class SubnavComponent extends SidenavComponent {

  constructor(public _ms:MenuService,public route: Router) {
    super(_ms,route);
  }


  @Input() subMenu:any = [];
  @Input() sbLvl:number = 0;


  ngOnInit() {

  }

  ngOnChanges() {
    this.sbLvl = this.sbLvl + 1;
  }
}
