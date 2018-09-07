import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../../app.component';
import { PucComponent } from '../../components/page-under-construction/puc.component';
import { DashboardwidgetsComponent } from '../../components/pages/dashboard/dashboardwidgets/dashboardwidgets.component';
import { LoginComponent } from '../../components/pages/login/login.component';
import { AdmincontentComponent } from '../../components/admin-content/admincontent/admincontent.component';
import { AuthenticationGuard } from '../../guards/auth.guard';
import { ListusersComponent } from '../../components/pages/users/admin/listusers/listusers.component';
import { AdduserComponent } from '../../components/pages/users/admin/adduser/adduser.component';
import { EdituserComponent } from '../../components/pages/users/admin/edituser/edituser.component';
import { InvestorUserListComponent } from '../../components/pages/users/investor/listuser/investor-user-list.component';
import { InvestorAddUserComponent } from '../../components/pages/users/investor/adduser/investor-add-user.component';
import { InvestorEditUserComponent } from '../../components/pages/users/investor/edituser/investor-edit-user.component';
import { CompanyComponent } from '../../components/pages/company/company.component';
import { CompanyEditComponent } from '../../components/pages/company/edit/company-edit.component';
import { PageComponent } from '../../components/pages/page/page.component';
import { CreatePageComponent } from '../../components/pages/page/create/create-page.component';
import { UpdatePageComponent } from '../../components/pages/page/update/update-page.component';
import { PageCategorCreateComponent } from '../../components/pages/page-cat/page-cat-create/page-categor-create.component';
import { PageCategoryUpdateComponent } from '../../components/pages/page-cat/page-cat-update/page-category-update.component';
import { PageCategoryComponent } from '../../components/pages/page-cat/page-category.component';
import { MenuComponent } from '../../components/pages/menu/menu.component';
import { CreateMenuComponent } from '../../components/pages/menu/create-menu/create-menu.component';
import { CreateMenuitemComponent } from '../../components/pages/menu-items/create-menuitem/create-menuitem.component';
import { ViewMenuComponent } from '../../components/pages/menu-items/view-menu/view-menu.component';
import { SymbolComponent } from '../../components/pages/markets/symbol/symbol.component';
import { ListMarketComponent } from '../../components/pages/markets/list-market/list-market.component';
import { AddMarketComponent } from '../../components/pages/markets/list-market/add-market/add-market.component';
import { EditMarketComponent } from '../../components/pages/markets/list-market/edit-market/edit-market.component';
import { TranslationComponent } from '../../components/pages/translation/translation.component';
import { LocaleComponent } from '../../components/pages/locale/locale.component';
import { CreateLocaleComponent } from '../../components/pages/locale/create-locale/create-locale.component';
import { UpdateLocaleComponent } from '../../components/pages/locale/update-locale/update-locale.component';
import { CreateTranslationComponent } from '../../components/pages/translation/create-translation/create-translation.component';
import { UpdateTranslationComponent } from '../../components/pages/translation/update-translation/update-translation.component';
import { LogsComponent } from '../../components/pages/users/logs/logs.component';
import { ActivityLogsComponent } from '../../components/pages/activity-logs/activity-logs.component';
import { ListTemplatesComponent } from '../../components/pages/mail-templates/list-templates/list-templates.component';
import { CreateTemplatesComponent } from '../../components/pages/mail-templates/create-templates/create-templates.component';
import { UpdateTemplatesComponent } from '../../components/pages/mail-templates/update-templates/update-templates.component';




const routes: Routes = [
    { path:'', redirectTo: 'login', pathMatch: 'full' },
    { path:'login', component:LoginComponent },
    //{ path:'',canActivateChild:[AuthenticationGuard], component:AdmincontentComponent, children: [
    { path:'', component:AdmincontentComponent, children: [
      { path:'dashboard', component:DashboardwidgetsComponent },
      { path:'activity-logs', component:ActivityLogsComponent },
      //{ path:'user-lists', component: ListusersComponent },
      { path:'admin', children: [
        { path:'user-lists', component: ListusersComponent },
        { path:'add-user', component: AdduserComponent },
        { path:'edit-user', component: EdituserComponent },
        { path:'edit-user/:id', component: EdituserComponent }
      ]},
      { path:'investor', children: [
        { path:'user-lists', component: InvestorUserListComponent },
        { path:'add-lists', component: InvestorAddUserComponent },
        { path:'edit-user', component: InvestorEditUserComponent },
        { path:'edit-user/:id', component: InvestorEditUserComponent },
        { path:'user-logs', component: LogsComponent },
        { path:'user-logs/:id', component: LogsComponent }
      ]},
      { path:'company', children: [
        { path:'lists', component: CompanyComponent },
        { path:'update', component: CompanyEditComponent },
        { path:'update/:id', component: CompanyEditComponent },
      ]},
      { path:'page', children: [
        { path:'lists', component: PageComponent },
        { path:'create', component: CreatePageComponent },
        { path:'update', component: UpdatePageComponent },
        { path:'update/:id', component: UpdatePageComponent },
      ]},
      { path:'page-category', children: [
        { path:'lists', component: PageCategoryComponent },
        { path:'create', component: PageCategorCreateComponent },
        { path:'update', component: PageCategoryUpdateComponent },
        { path:'update/:id', component: PageCategoryUpdateComponent },
      ]},
      { path:'locale', children: [
        { path:'view', component: LocaleComponent },
        { path:'create', component: CreateLocaleComponent },
        { path:'update', component: UpdateLocaleComponent },
        { path:'update/:id', component: UpdateLocaleComponent },
      ]},
      { path:'menu', children: [
        { path:'create', component: CreateMenuComponent }
      ]},
      { path:'menu-item', children: [
        { path:'view', component: ViewMenuComponent },
        { path:'create', component: CreateMenuitemComponent }
      ]},
      { path:'markets', children: [
        { path:'symbol', component: SymbolComponent },
        { path:'list', component: ListMarketComponent },
        { path:'add', component: AddMarketComponent },
        { path:'update', component: EditMarketComponent },
        { path:'update/:id', component: EditMarketComponent }
      ]},
      { path:'translation', children: [
        { path:'list', component: TranslationComponent },
        { path:'create', component: CreateTranslationComponent },
        { path:'update', component: UpdateTranslationComponent },
        { path:'update/:id', component: UpdateTranslationComponent }
      ]},
      { path:'mail-template', children: [
        { path:'list', component: ListTemplatesComponent },
        { path:'create', component: CreateTemplatesComponent },
        { path:'update', component: UpdateTemplatesComponent },
        { path:'update/:id', component: UpdateTemplatesComponent }
      ]},
      { path:'page-under-construction', component:PucComponent },
    ]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ],
  providers: []
})
export class HybseRoutingModule { }
