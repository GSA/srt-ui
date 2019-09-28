import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS

import { AdminComponent } from './admin/admin.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth-guard.service';
import { HelpComponent } from './help/help.component';
import {MasqComponent} from './user/masq/masq.component';
import {AdminGuard} from './admin-guard.service';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'admin/accepted', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: true, isRejected: false }},
  {path: 'admin/masq', component: MasqComponent, canActivate: [AuthGuard] , data: {}},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: false, isRejected: false }},
  {path: 'analytics', component: AnalyticsComponent, canActivate: [AdminGuard]},
  {path: 'help', component: HelpComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

