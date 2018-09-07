import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/utilities/menu.services';

@Component({
  selector: 'hybse-admin-admincontent',
  templateUrl: './admincontent.component.html',
  styleUrls: ['./admincontent.component.css']
})
export class AdmincontentComponent implements OnInit {

  constructor(public _ms:MenuService) { }
  
  ngOnInit() {
  }

}
