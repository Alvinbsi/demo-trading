import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../services/utilities/utilities.services';


@Component({
  selector: 'hybse-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private _utils: UtilityService) { }

  scrollToTop() {
    this._utils.scrollToY(0,400,'easeInOutQuint');
  }


  ngOnInit() {
    this.scrollToTop();

  }

}
