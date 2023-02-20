import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginGuard } from './auth/LoginGuard.guard';


const routes: Routes = [
  { path: 'login',component:LoginComponent,
  data: { returnUrl: window.location.pathname }
},
  { path: '', redirectTo: '/login', pathMatch:'full'},
  { path: 'admin',canActivate: [AuthGuard], loadChildren: () => import('./module/adimn/adimn.module').then(m => m.AdimnModule) },
  // { path: 'admin',canActivate: [AuthGuard], loadChildren: () => import('./module/adimn/adimn.module').then(m => m.AdimnModule) },
  { path:'**',component:LoginComponent},
];

// canActivate: [LoginGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
