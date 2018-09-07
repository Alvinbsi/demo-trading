import { Component, OnInit } from '@angular/core';
import { fadeInDown } from 'ng-animate';
import { trigger, transition, useAnimation } from '@angular/animations';
import { ApiurlsService } from '../../../services/api-urls/apiurls.service';
import { UtilityService } from '../../../services/utilities/utilities.services';
import { ApirequestService } from '../../../services/apirequest/apirequest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmdialogComponent } from '../../common/dialog/confirmdialog.component';
import { MatDialog } from '@angular/material';



@Component({
  selector: 'hybse-admin-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation( fadeInDown,{
      params: {
        timing: 1,
        a: '-10px'
      }
    }))])
  ]
})
export class MenuComponent implements OnInit {

  constructor(
    private _urls: ApiurlsService,
    private _utils: UtilityService,
    private _req: ApirequestService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router ) { }
  fadeInDown:any;
  showLoader:boolean = false;
  pageList:any = [];
  pageListView:any = [];
  toggleAllChecked:boolean = false;
  allMenuList:any = [];

  getPageLists() {
    this._req.fetchApiData(this._urls.pageListUrl,{}).subscribe(
      (data:any) => {
        console.log(data);
        let resSucc = data.data;
        let resErr = data.error;
        if( resSucc != '' ) this.pageList = this._utils.addPropInObj(resSucc,['isEnabled'],[false]);
        console.log('this.pageList',this.pageList);
      },
      error => {
      },
      () => {

      }
    );
  }


  pageCheckToggle(e) {
    let pageId = e.source.value;
    this.toggleAllChecked = false;
    this.pageList.forEach(ele => {
      if(ele.id == pageId) ele.isEnabled = e.checked;
    });
  }

  toggleAllMenu(e) {
    this.toggleAllChecked = e.checked;
    this.pageList.forEach(ele => {
      ele.isEnabled = e.checked;
    });
  }

  getMenuNameArray() {
    let name = [];
    this.pageList.forEach(ele => {
      if(ele.isEnabled) name.push(ele.title);
    });
    return name;
  }


  addMenuItem() {
    let data = {
      menuName: this.getMenuNameArray()
    };
    this.showLoader = true;
    console.log(data);
    this._req.fetchApiData(this._urls.createMenuUrl,data).subscribe(
      (data:any) => {
        let resSucc = data.data;
        let resErr = data.error;
        let finalData = this._utils.addPropInObj(resSucc,['collapseEdit','showLoader'],[false,false]);
        this.addToMenuList(finalData);
        this.disableAllChecked();
      },
      error => {

      },
      () => {
        this.showLoader = false;
      }
    );
  }




  disableAllChecked() {
    this.toggleAllChecked = false;
    this.pageList.forEach(ele => {
      ele.isEnabled = false;
    });
  }


  addToMenuList(data) {
    data.forEach(el => {
      this.allMenuList.push(el);
    });
    console.log('afterPushed',this.allMenuList)
  }
  getAllMenuList() {
    this._req.fetchApiData(this._urls.listAllMenuUrl,{}).subscribe(
      (data:any) => {
        let resSucc = data.data;
        let resErr = data.error;
        if( resSucc != '' )
          this.allMenuList = this._utils.addPropInObj(resSucc,['collapseEdit','showLoader'],[false,false]);

        console.log('this.allMenuList',this.allMenuList);
      },
      error => {

      },
      () => {

      }
    );
  }

  updateMenu(i,id,menu) {
    let data = {
      id: id,
      menuName: menu
    };
    this.allMenuList[i].showLoader = true;
    this._req.fetchApiData(this._urls.updateMenuUrl,data).subscribe(
      (data:any) => {
        console.log(data);
        let resSucc = data.data;
        if(resSucc != '')  this.allMenuList[i].showLoader = false;
      },
      error => {

      },
      () => {

      }
    )
  }


  toggleEdit(i) {
    this.allMenuList[i].collapseEdit = !this.allMenuList[i].collapseEdit;
  }


  confirmDelete(id) {
    const deleteDialog = this.dialog.open(ConfirmdialogComponent,{
      width: '400px',
      height: '170px',
      data: {
        message: 'Are you sure to delete?'
      }
    });

    deleteDialog.afterClosed().subscribe(
      data => {
        //console.log('Dialog data',data);
        if(data) this.deleteMenu(id);
      }
    );
  }

  deleteMenu(id) {
    let data = { id: id };
    this.showLoader = true;
    this._req.fetchApiData( this._urls.deleteMenuUrl,data ).subscribe(
      (data:any) => {
        console.log('pageCatList',data);
        let response = data.data;
        if(response != 0 ) this.deleteMenuFromList(response);
      },
      error => {

      },
      () => {
        this.showLoader = false;
      }
    );
  }

  deleteMenuFromList(id) {
    this.allMenuList = this._utils.filterArrayObj(this.allMenuList,'id',id);
  }

  ngOnInit() {
    this.getPageLists();
    this.getAllMenuList()
  }

}
