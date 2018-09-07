import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hybse-issueradmin-loaders',
  templateUrl: './loaders.component.html',
  styleUrls: ['./loaders.component.css']
})
export class LoadersComponent implements OnInit {

  constructor() { }


  @Input() position:string = '';
  @Input() topVal:number = 0;

  loaderStyles:any = {
    'position': 'absolute',
    'left': 0,
    'right': 0,
    'margin': 'auto'
  };

  ngOnInit() {
  }

  ngOnChanges() {
    if( this.position == 'center') {
      this.loaderStyles = {
        ...this.loaderStyles,
        'top': 0,
        'bottom': 0,
      }
    } else {
      this.loaderStyles = {
        ...this.loaderStyles,
        'top': this.topVal == 0 ? 150 : this.topVal,
      }
    }
  }

}
