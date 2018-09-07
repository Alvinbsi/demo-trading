import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../services/utilities/utilities.services';

@Component({
  selector: 'hybse-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private _utils: UtilityService) { }

  scrollToTop() {
    this._utils.scrollToY(0,400,'easeInOutQuint');
  }


  ngOnInit() {
    this.scrollToTop();
  }

}
