import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AdimnRoutingModule } from './adimn-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AmindashComponent } from '../components/amindash/amindash.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ReportsComponent } from '../components/reports/reports.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ManageCodeComponent } from '../components/manage-code/manage-code.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { MessageComponent } from '../components/message/message.component';
import { SettingComponent } from '../components/setting/setting.component';
// import { NgSelect2Module } from 'ng-select2';
// import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from 'src/app/auth/auth.service';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelect2Module } from 'ng-select2';
import { NgSelectModule } from '@ng-select/ng-select';
import { LogoutComponent } from 'src/app/components/logout/logout.component';





@NgModule({
  declarations: [
    AmindashComponent,
    DashboardComponent,
    ReportsComponent,
    ManageCodeComponent,
    ChangePasswordComponent,
    MessageComponent,
    SettingComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AdimnRoutingModule,
    TabsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
    // HttpClientModule,
    NgSelect2Module,
    NgSelectModule,
  ],

  providers: [ AuthService,{provide:LocationStrategy, useClass:HashLocationStrategy},DatePipe ],
  exports: [
    NgSelect2Module,
    NgSelectModule,
  ]
})
export class AdimnModule { }
