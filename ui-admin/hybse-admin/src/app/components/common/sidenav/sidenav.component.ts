import { Component, OnInit } from '@angular/core';
import { admimMenu } from '../../../config/adminMenuConfig/admin.menu';
import { MenuService } from '../../../services/utilities/menu.services';
import { Menu } from '../../../interface/menu.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'hybse-admin-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public _ms:MenuService,public route: Router) { }

  adminMenu:any = admimMenu;


  menuAction(menu:Menu) {
    if(menu.submenu.length > 0 ) {
      menu.subMenuCollapse = !menu.subMenuCollapse;
    } else {
      this.route.navigateByUrl(menu.path);
    }
    return false;
  }

  ngOnInit() {
  }

}
