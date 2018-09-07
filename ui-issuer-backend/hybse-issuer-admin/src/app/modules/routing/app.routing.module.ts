import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../../app.component';
import { CompanyInformationComponent } from '../../components/pages/company/company-information/company-information.component';
import { CompanyDescriptionComponent } from '../../components/pages/company/company-description/company-description.component';
import { ManagementInformationComponent } from '../../components/pages/company/management-information/management-information.component';
import { FinancialDocumentsComponent } from '../../components/pages/company/financial-documents/financial-documents.component';





const routes: Routes = [
  { path:'', redirectTo: 'company-information', pathMatch: 'full', data: { title: 'Company Information' } },
  { path:'company-information', component: CompanyInformationComponent, data: { title: 'Company Information' } },
  { path:'company-description', component: CompanyDescriptionComponent, data: { title: 'Company Description' } },
  { path:'management-information', component: ManagementInformationComponent, data: { title: 'Management Information' } },
  { path:'financial-documents', component: FinancialDocumentsComponent, data: { title: 'Financial Documents' } },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})
export class HybseRoutingModule { }
