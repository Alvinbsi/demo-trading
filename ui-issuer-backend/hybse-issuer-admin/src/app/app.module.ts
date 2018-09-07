import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
/* Components */
import { AppComponent } from './app.component';




/* Services */
import { UtilityService } from './services/utilities/utilities.services';
import { MenuService } from './services/utilities/menu.services';
import { ApiDataServices } from './services/apiservices/api.services';
/* Pipes */
import { ObjNgForPipe } from './pipes/objNgFor/objNgFor.pipe';


/* Application Routing Module */
import { HybseRoutingModule } from './modules/routing/app.routing.module';



import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';




/* Configuration */
import { HybseConfig } from './config/hybse.config';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApirequestService } from './services/apirequest/apirequest.service';
import { ApiurlsService } from './services/api-urls/apiurls.service';
import { StorageService } from './services/localstorage/storage.service';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { ContentComponent } from './components/common/content/content.component';
import { HeaderComponent } from './components/common/header/header.component';
import { CompanyInformationComponent } from './components/pages/company/company-information/company-information.component';
import { CompanyDescriptionComponent } from './components/pages/company/company-description/company-description.component';
import { SubnavComponent } from './components/common/sidebar/subnav/subnav.component';
import { CompanyService } from './services/company/company.service';
import { ManagementInformationComponent } from './components/pages/company/management-information/management-information.component';
import { FinancialDocumentsComponent } from './components/pages/company/financial-documents/financial-documents.component';
import { GetnamePipe } from './pipes/utils/getname.pipe';
import { RippleClickEffect } from './directives/clickripple/click-ripple.directive';
import { LoadersComponent } from './components/common/loaders/loaders.component';
import { ToasterOption } from './config/toaster.options';
import { GetfilehandlePipe } from './pipes/utils/getfilehandle.pipe';
import { DataCommunication } from './services/utilities/data.comm';



@NgModule({
  declarations: [
    AppComponent,
    ObjNgForPipe,
    SidebarComponent,
    ContentComponent,
    HeaderComponent,
    CompanyInformationComponent,
    CompanyDescriptionComponent,
    SubnavComponent,
    RippleClickEffect,
    ManagementInformationComponent,
    FinancialDocumentsComponent,
    GetnamePipe,
    LoadersComponent,
    GetfilehandlePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastModule.forRoot(),
    HybseRoutingModule
  ],
  providers: [
    //{provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: ToastOptions, useClass: ToasterOption },
    HybseConfig,
    ApiDataServices,
    ApirequestService,
    ApiurlsService,
    UtilityService,
    DataCommunication,
    MenuService,
    StorageService,
    CompanyService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
