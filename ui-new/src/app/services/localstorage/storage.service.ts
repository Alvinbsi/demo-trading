import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class StorageService {

  constructor() { }

  storageVal = new BehaviorSubject('');
  getLocalItems(key) {
    let val = localStorage.getItem(key);
    return val;
  }

  setLocalItem(key,val) {
    let value = ( typeof val === 'object' ) ? JSON.stringify(val) : val;
    localStorage.setItem(key,value);
  }

  removeItem(key) {
    localStorage.removeItem(key);
  }

  clearStorage() {
    localStorage.clear();
  }


}
