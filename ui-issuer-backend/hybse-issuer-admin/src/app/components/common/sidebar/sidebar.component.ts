import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { adminMenu } from '../../../config/adminMenuConfig/admin.menu';
import { MenuService } from '../../../services/utilities/menu.services';
import { Menu } from '../../../interface/menu.interface';

@Component({
  selector: 'hybse-issueradmin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public _ms:MenuService,public route: Router ) { }

  adminMenu:any = adminMenu;


  menuAction(menu:Menu) {
    if(menu.submenu.length > 0 ) {
      menu.subMenuCollapse = !menu.subMenuCollapse;
    } else {
      this.route.navigateByUrl(menu.path);
    }
    return false;
  }
  ngOnInit() {
    console.log(adminMenu);
  }

}
