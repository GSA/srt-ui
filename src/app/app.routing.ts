import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AuthComponent } from './auth/auth.component';
import { SolicitationReportComponent } from './report/solicitation-report/solicitation-report.component';
import { SolicitationReviewComponent } from './solicitation-review/solicitation-review.component';
import { SrtComponent } from './srt/srt.component';
import { ResultsDetailComponent } from './report/summary/results-detail/results-detail.component';
import { SummaryComponent } from './report/summary/summary.component';
import { EmailPocComponent } from './report/summary/email-poc/email-poc.component';
import { FaqComponent} from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HelpUsImproveComponent } from './report/summary/help-us-improve/help-us-improve.component';

import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { SolicitationTableComponent } from './solicitation-table/solicitation-table.component';

const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'password', component: PasswordComponent},
  {path: 'report/:id', component: SummaryComponent},
  {path: 'report', component: SolicitationReportComponent},
  {path: 'email/:id', component: EmailPocComponent},
  {path: 'home', component: SrtComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'analytics', component: AnalyticsComponent},
  {path: 'feedback', component: SolicitationReviewComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'contactus', component: ContactUsComponent},
  {path: 'table', component: SolicitationTableComponent},
  //{path: 'solicitation-feedback/:id', component: HelpUsImproveComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
