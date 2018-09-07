import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../services/company/company.service';

@Component({
  selector: 'hybse-issueradmin-financial-documents',
  templateUrl: './financial-documents.component.html',
  styleUrls: ['./financial-documents.component.css']
})
export class FinancialDocumentsComponent implements OnInit {

  constructor( private _cs:CompanyService ) { }
  loaderToggle:boolean = true;
  financialDocs:any = [];

  /* Getting Company Information */
  getCompDetails() {
    this._cs.companyDetails.subscribe(
      (val) => {
        if(Object.keys(val).length !== 0) {
          this.loaderToggle = false;
          this.financialDocs = val.companyDocument;
          console.log('this.financialDocs',this.financialDocs);
        }
      }
    )
  }

  ngOnInit() {
    this.getCompDetails();
  }



}
