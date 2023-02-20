import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from 'src/app/components/logout/logout.component';
import { AmindashComponent } from '../components/amindash/amindash.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ManageCodeComponent } from '../components/manage-code/manage-code.component';
import { MessageComponent } from '../components/message/message.component';
import { ReportsComponent } from '../components/reports/reports.component';
import { SettingComponent } from '../components/setting/setting.component';



const routes: Routes = [
  {path: '', component: AmindashComponent,
children:[
  // { path: '', redirectTo: '/dashboard', pathMatch:'full'},
 { path:'dashboard',component:DashboardComponent},
 { path:'reports',component:ReportsComponent},
 { path:'managecode',component:ManageCodeComponent},
 { path:'message',component:MessageComponent},
 { path:'setting',component:SettingComponent},
 { path:'changepassword',component:ChangePasswordComponent},
 { path: 'logout',component:LogoutComponent},
 { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
 { path: '**', redirectTo: 'overview', pathMatch: 'full' }
 ]},
//  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class AdimnRoutingModule { }
