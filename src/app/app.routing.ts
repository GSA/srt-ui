import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AnalyticsComponent } from '../analytics/analytics.component';
import { HelpComponent } from '../help/help.component'
import { AuthComponent } from './auth/auth.component';
import { SolicitationReportComponent } from './report/solicitation-report/solicitation-report.component';
import { SolicitationReviewComponent } from './solicitation-review/solicitation-review.component';
import { SrtComponent } from './srt/srt.component';
import { ResultsDetailComponent } from './report/summary/results-detail/results-detail.component';
import { SummaryComponent } from './report/summary/summary.component';
import { EmailPocComponent } from './report/summary/email-poc/email-poc.component';

import { HelpUsImproveComponent } from './report/summary/help-us-improve/help-us-improve.component';

import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';


import { AuthGuard } from './auth-guard.service'

const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'password', component: PasswordComponent, canActivate: [AuthGuard]},
  {path: 'report/:id', component: SummaryComponent, canActivate: [AuthGuard]},
  {path: 'report', component: SolicitationReportComponent, canActivate: [AuthGuard]},
  {path: 'email/:id', component: EmailPocComponent, canActivate: [AuthGuard]},
  {path: 'home', component: SrtComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard]},
  {path: 'feedback', component: SolicitationReviewComponent, canActivate: [AuthGuard]},
  {path: 'help', component: HelpComponent, canActivate: [AuthGuard]},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
