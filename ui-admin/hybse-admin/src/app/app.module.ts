import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
/* ScrollBar */
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

/* Frola Editor */
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


import { DragulaModule } from 'ng2-dragula';
/* Material Modules
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';*/

/* Components */
import { AppComponent } from './app.component';
import { PucComponent } from './components/page-under-construction/puc.component';
import { SidenavComponent } from './components/common/sidenav/sidenav.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { AdmincontentComponent } from './components/admin-content/admincontent/admincontent.component';
import { DashboardinfoComponent } from './components/pages/dashboard/dashboardinfo/dashboardinfo.component';
import { DashboardwidgetsComponent } from './components/pages/dashboard/dashboardwidgets/dashboardwidgets.component';
import { RecentactivitiesComponent } from './components/pages/dashboard/dashboardwidgets/recentactivities/recentactivities.component';
import { DocumentapprovalComponent } from './components/pages/dashboard/dashboardwidgets/documentapproval/documentapproval.component';
import { ImageapprovalComponent } from './components/pages/dashboard/dashboardwidgets/imageapproval/imageapproval.component';
import { LatestticketsComponent } from './components/pages/dashboard/dashboardwidgets/latesttickets/latesttickets.component';
import { SubnavComponent } from './components/common/sidenav/subnav/subnav.component';
import { LoginComponent } from './components/pages/login/login.component';
import { InvestorUserListComponent } from './components/pages/users/investor/listuser/investor-user-list.component';



/* Services */
import { UtilityService } from './services/utilities/utilities.services';
import { MenuService } from './services/utilities/menu.services';
import { LoginService } from './services/login/login.service';
import { ApiDataServices } from './services/apiservices/api.services';
/* Pipes */
import { ObjNgForPipe } from './pipes/objNgFor/objNgFor.pipe';


/* Application Routing Module */
import { HybseRoutingModule } from './modules/routing/app.routing.module';

/* Application Material Module */
import { HybseMaterialModule } from './modules/material/material.module';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* Directives */
import { VerticalscrollbarDirective } from './directives/scrollbar/verticalscrollbar.directive';

/* Redux Imports */
import { StoreModule } from '@ngrx/store';
import { hybseReducers } from './app.reducer';



/* Configuration */
import { HybseConfig } from './config/hybse.config';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationGuard } from './guards/auth.guard';
import { ListusersComponent } from './components/pages/users/admin/listusers/listusers.component';
import { AdduserComponent } from './components/pages/users/admin/adduser/adduser.component';
import { EdituserComponent } from './components/pages/users/admin/edituser/edituser.component';
import { UserService } from './services/user/user.service';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { InvestorAddUserComponent } from './components/pages/users/investor/adduser/investor-add-user.component';
import { ApirequestService } from './services/apirequest/apirequest.service';
import { ApiurlsService } from './services/api-urls/apiurls.service';
import { ConfirmdialogComponent } from './components/common/dialog/confirmdialog.component';
import { LoaderComponent } from './components/common/loader/loader.component';
import { InvestorEditUserComponent } from './components/pages/users/investor/edituser/investor-edit-user.component';
import { CompanyComponent } from './components/pages/company/company.component';
import { CompanyEditComponent } from './components/pages/company/edit/company-edit.component';
import { UpdateUserComponent } from './components/pages/company/edit/update-user/update-user.component';
import { PageComponent } from './components/pages/page/page.component';
import { CreatePageComponent } from './components/pages/page/create/create-page.component';
import { UpdatePageComponent } from './components/pages/page/update/update-page.component';
import { PageCategoryComponent } from './components/pages/page-cat/page-category.component';
import { PageCategorCreateComponent } from './components/pages/page-cat/page-cat-create/page-categor-create.component';
import { PageCategoryUpdateComponent } from './components/pages/page-cat/page-cat-update/page-category-update.component';
import { MenuComponent } from './components/pages/menu/menu.component';
import { CreateMenuComponent } from './components/pages/menu/create-menu/create-menu.component';
import { ViewMenuComponent } from './components/pages/menu-items/view-menu/view-menu.component';
import { CreateMenuitemComponent } from './components/pages/menu-items/create-menuitem/create-menuitem.component';
import { CompanyMembersComponent } from './components/pages/company/edit/management-member/company-members.component';
import { SymbolComponent } from './components/pages/markets/symbol/symbol.component';
import { ListMarketComponent } from './components/pages/markets/list-market/list-market.component';
import { AddMarketComponent } from './components/pages/markets/list-market/add-market/add-market.component';
import { EditMarketComponent } from './components/pages/markets/list-market/edit-market/edit-market.component';
import { StorageService } from './services/localstorage/storage.service';
import { TableComponent } from './components/common/table/table.component';
import { PaginationComponent } from './components/common/pagination/pagination.component';
import { TranslationComponent } from './components/pages/translation/translation.component';
import { LocaleComponent } from './components/pages/locale/locale.component';
import { CreateLocaleComponent } from './components/pages/locale/create-locale/create-locale.component';
import { UpdateLocaleComponent } from './components/pages/locale/update-locale/update-locale.component';
import { CreateTranslationComponent } from './components/pages/translation/create-translation/create-translation.component';
import { UpdateTranslationComponent } from './components/pages/translation/update-translation/update-translation.component';
import { LogsComponent } from './components/pages/users/logs/logs.component';
import { ParseuaPipe } from './pipes/utilities/parseua.pipe';
import { ActivityLogsComponent } from './components/pages/activity-logs/activity-logs.component';
import { ListTemplatesComponent } from './components/pages/mail-templates/list-templates/list-templates.component';
import { CreateTemplatesComponent } from './components/pages/mail-templates/create-templates/create-templates.component';
import { UpdateTemplatesComponent } from './components/pages/mail-templates/update-templates/update-templates.component';
import { ActivityDetailsComponent } from './components/pages/users/logs/activity-details/activity-details.component';

@NgModule({
  declarations: [
    ObjNgForPipe,
    AppComponent,
    PucComponent,
    SidenavComponent,
    HeaderComponent,
    FooterComponent,
    AdmincontentComponent,
    DashboardinfoComponent,
    DashboardwidgetsComponent,
    RecentactivitiesComponent,
    DocumentapprovalComponent,
    ImageapprovalComponent,
    LatestticketsComponent,
    VerticalscrollbarDirective,
    SubnavComponent,
    LoginComponent,
    ListusersComponent,
    AdduserComponent,
    EdituserComponent,
    InvestorUserListComponent,
    InvestorAddUserComponent,
    ConfirmdialogComponent,
    LoaderComponent,
    InvestorEditUserComponent,
    CompanyComponent,
    CompanyEditComponent,
    UpdateUserComponent,
    PageComponent,
    CreatePageComponent,
    UpdatePageComponent,
    PageCategoryComponent,
    PageCategorCreateComponent,
    PageCategoryUpdateComponent,
    MenuComponent,
    CreateMenuComponent,
    ViewMenuComponent,
    CreateMenuitemComponent,
    CompanyMembersComponent,
    SymbolComponent,
    ListMarketComponent,
    AddMarketComponent,
    EditMarketComponent,
    TableComponent,
    PaginationComponent,
    TranslationComponent,
    LocaleComponent,
    CreateLocaleComponent,
    UpdateLocaleComponent,
    CreateTranslationComponent,
    UpdateTranslationComponent,
    LogsComponent,
    ParseuaPipe,
    ActivityLogsComponent,
    ListTemplatesComponent,
    CreateTemplatesComponent,
    UpdateTemplatesComponent,
    ActivityDetailsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    HybseMaterialModule,
    MalihuScrollbarModule,
    DragulaModule,
    HybseRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(hybseReducers),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  entryComponents: [ConfirmdialogComponent,ActivityDetailsComponent],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    HybseConfig,
    UtilityService,
    MenuService,
    ApiDataServices,
    LoginService,
    AuthenticationGuard,
    MalihuScrollbarService,
    UserService,
    ApirequestService,
    StorageService,
    ApiurlsService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
