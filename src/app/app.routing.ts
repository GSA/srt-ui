import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS

import { HomeComponent} from './home/home/home.component'
import { AdminComponent } from './admin/admin.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth-guard.service';
import { HelpComponent } from './help/help.component';
import { SolicitationComponent } from './solicitation/solicitation.component';
import { SolicitationReviewComponent } from './solicitation-review/solicitation-review.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},  
  {path: 'auth', component: AuthComponent},
  {path: 'admin/accepted', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: true, isRejected: false }},
  {path: 'admin/rejected', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: false, isRejected: true }},
  {path: 'admin/pending', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: false, isRejected: false }},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: false, isRejected: false }},
  {path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard]},
  {path: 'feedback', component: SolicitationReviewComponent, canActivate: [AuthGuard]},
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

// const APP_ROUTES: Routes = [
  // {path: '', redirectTo: 'home', pathMatch: 'full'},
  // {path: 'auth', component: AuthComponent},
  // {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  // {path: 'password', component: PasswordComponent, canActivate: [AuthGuard]},
  // {path: 'home', component: SrtComponent, canActivate: [AuthGuard]},
  // {path: 'admin/accepted', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: true, isRejected: false }},
  // {path: 'admin/rejected', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: false, isRejected: true }},
  // {path: 'admin/pending', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: false, isRejected: false }},
  // {path: 'admin', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: false, isRejected: false }},
  // {path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard]},
  // {path: 'feedback', component: SolicitationReviewComponent, canActivate: [AuthGuard]},
  // {path: 'help', component: HelpComponent, canActivate: [AuthGuard]},
// ];

// export const routing = RouterModule.forRoot(APP_ROUTES);
