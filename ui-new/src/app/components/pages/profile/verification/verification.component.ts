import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../services/localstorage/storage.service';
import { ApirequestService } from '../../../../services/apirequest/apirequest.service';
import { ApiurlsService } from '../../../../services/api-urls/apiurls.service';
import { UtilityService } from '../../../../services/utilities/utilities.services';



@Component({
  selector: 'hybse-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  constructor( private _utils: UtilityService, private _urls:ApiurlsService,    private _req: ApirequestService,    private _lstore: StorageService) { }

  idUser:any;
  silverValue:any;
  isSilverVerified:any;
  silverVerified:boolean = false;

  goldValue:any;
  isGoldVerified:any;
  goldVerified:boolean = false;

  silverBtn:boolean = true ;
  goldBtn:boolean = true;


  userDetails(){
    this.idUser = this._lstore.getLocalItems('user');

    let data = {          idUser: this.idUser
    };

    this._req.fetchApiData(this._urls.userDetailsUrl,data).subscribe(
      (data:any) => {
         let response = data.data;
        
         this.silverValue = response.isSilverVerified;
          this.goldValue = response.isGoldVerified;

          if(this.silverValue == 1 ){
            this.silverBtn = false;
            this.silverVerified = true;
          }
      
          else{
            this.silverBtn = true;
          this.silverVerified = false;
          }
      
          if( this.silverValue == 1 && this.goldValue == 1 ){
                  this.goldVerified = true;
                  this.goldBtn = false;
          }
      
          else{
          this.goldVerified = false;
          this.goldBtn = true;
          }


      },
      error => {

      },
      () => {

      })


  }




  scrollToTop() {
    this._utils.scrollToY(0,400,'easeInOutQuint');
  }

  ngOnInit() {
    this.scrollToTop();
    this.userDetails();
    

  }

}
