import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class MenuService {
  constructor() { }
  slideMenuToggle:boolean = false;
}
