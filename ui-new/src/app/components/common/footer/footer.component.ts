import { Component, OnInit } from '@angular/core';
import { ApiDataServices } from '../../../services/apiservices/api.services';
import { UtilityService } from '../../../services/utilities/utilities.services';
import { ClockService } from '../../../services/clock/clock.service';


@Component({
  selector: 'hybse-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private _cS: ClockService ) { }

  showTime:any;
  cet:any;
  
  getTime(){
    this._cS.clockService().subscribe(
      (data:any) => {
          this.cet = data;
          this.showClock();
       },
      error => {
  
      },
      () => {
  
      }
  )
  }

  showClock() {
 
    var utcSeconds = this.cet;
    //alert(utcSeconds);
    var d = new Date(0);
    var ms = d.setUTCSeconds(utcSeconds);
    //ms += 360000;
  
    var date = this.getCETorCESTDate(ms);
  
    var h:any = date.getHours();
    var m:any = date.getMinutes();
    var s:any = date.getSeconds();
    var session = "";
      // if(h == 0){
      //     h = 12;
      // }
      // if(h > 12){
      //     h = h - 12;
      //     session = "PM";
      // }
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
  
    this.showTime = h + ":" + m + ":" + s + " " + session;
  
    // console.log('Timer Working properly');
  
    setTimeout(()=>{
      this.cet = this.cet + 1;
      this.showClock();
    }, 1000);
  }

  getCETorCESTDate(ms) {
    var localDate = new Date(ms);
    var utcOffset = localDate.getTimezoneOffset();
    var cetOffset = utcOffset + 60;
    var cestOffset = utcOffset + 120;
    var cetOffsetInMilliseconds = cetOffset * 60 * 1000;
    var cestOffsetInMilliseconds = cestOffset * 60 * 1000;
  
    var cestDateStart = new Date();
    var cestDateFinish = new Date();
    var localDateTime = localDate.getTime();
    var cestDateStartTime;
    var cestDateFinishTime;
    var result;
  
    cestDateStart.setTime(Date.parse('29 March ' + localDate.getFullYear() + ' 02:00:00 GMT+0100'));
    cestDateFinish.setTime(Date.parse('25 October ' + localDate.getFullYear() + ' 03:00:00 GMT+0200'));
  
    cestDateStartTime = cestDateStart.getTime();
    cestDateFinishTime = cestDateFinish.getTime();
  
    if(localDateTime >= cestDateStartTime && localDateTime <= cestDateFinishTime) {
        result = new Date(localDateTime + cestOffsetInMilliseconds);
    } else {
        result = new Date(localDateTime + cetOffsetInMilliseconds);
    }
  
    return result;
  }
  

  ngOnInit() {
    this.getTime();  
  }

}
