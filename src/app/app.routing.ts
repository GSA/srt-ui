import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AuthComponent } from './auth/auth.component';
import { SolicitationReportComponent } from './report/solicitation-report/solicitation-report.component';
import { SolicitationReviewComponent } from './solicitation-review/solicitation-review.component';
import { SrtComponent } from './srt/srt.component';
import { ResultsDetailComponent } from './report/results-detail/results-detail.component';
import { EmailPocComponent } from './report/email-poc/email-poc.component';

const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'report/:id', component: ResultsDetailComponent},
  {path: 'report', component: SolicitationReportComponent},
  {path: 'email/:id', component: EmailPocComponent},
  {path: 'srt', component: SrtComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'analytics', component: AnalyticsComponent},
  {path: 'feedback', component: SolicitationReviewComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
