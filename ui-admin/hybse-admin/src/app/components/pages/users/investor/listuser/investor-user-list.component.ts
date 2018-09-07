import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'ng-animate';
import { FormBuilder, FormGroup, Validators,FormControl, AbstractControl } from '@angular/forms';
import { UserService } from '../../../../../services/user/user.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'hybse-admin-investor-user-list',
  templateUrl: './investor-user-list.component.html',
  styleUrls: ['./investor-user-list.component.css']
})
export class InvestorUserListComponent implements OnInit {

  ngOnInit() {

  }

  ngOnChanges() {
  }

}
