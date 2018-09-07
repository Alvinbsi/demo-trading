import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'hybse-issueradmin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private _cs:CompanyService,
     private router : Router,
     private route: ActivatedRoute ) {

  }

  editMode:boolean = false;
  headerTitle:string = '';


  updateCompProf() {
    this._cs.editMode.next(true);
  }

  getEditMode() {
    this._cs.editMode.subscribe(
      val => {
        this.editMode = val;
      }
    );
  }

  ngOnInit() {
    this.getEditMode();
  }

}
