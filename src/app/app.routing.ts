import { Routes, RouterModule } from '@angular/router';


import { AdminComponent } from './admin/admin.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth-guard.service';
import { HelpComponent } from './help/help.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { SolicitationComponent } from './solicitation/solicitation.component';
import { SolicitationReviewComponent } from './solicitation-review/solicitation-review.component';
import { SrtComponent } from './srt/srt.component';


const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'password', component: PasswordComponent, canActivate: [AuthGuard]},
  {path: 'home', component: SrtComponent, canActivate: [AuthGuard]},
  {path: 'admin/accepted', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: true, isRejected: false }},
  {path: 'admin/rejected', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: false, isRejected: true }},
  {path: 'admin/pending', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: false, isRejected: false }},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: false, isRejected: false }},
  {path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard]},
  {path: 'feedback', component: SolicitationReviewComponent, canActivate: [AuthGuard]},
  {path: 'help', component: HelpComponent, canActivate: [AuthGuard]},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
