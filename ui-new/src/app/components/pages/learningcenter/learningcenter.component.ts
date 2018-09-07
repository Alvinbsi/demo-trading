import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../services/utilities/utilities.services';

@Component({
  selector: 'hybse-learningcenter',
  templateUrl: './learningcenter.component.html',
  styleUrls: ['./learningcenter.component.css']
})
export class LearningcenterComponent implements OnInit {

  constructor(private _utils: UtilityService) { }

  scrollToTop() {
    this._utils.scrollToY(0,400,'easeInOutQuint');
  }

  ngOnInit() {
    this.scrollToTop();
  }

}
