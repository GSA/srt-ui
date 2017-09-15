
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth-guard.service'

import { SolicitationReportComponent } from './solicitation-report/solicitation-report.component';
import { SummaryComponent } from './summary/summary.component';
import { ResultsDetailComponent } from './summary/results-detail/results-detail.component';
import { HelpUsImproveComponent } from './summary/help-us-improve/help-us-improve.component';
import { EmailPocComponent } from './summary/email-poc/email-poc.component';
import { HistoryComponent } from './summary/history/history.component';
import { SolicitationComponent } from './solicitation.component';
import { FeedbackReportComponent } from './feedback-report/feedback-report.component'
import { FormComponent } from './feedback-report/form/form.component';

const solicitationRoutes: Routes = [
    { path: 'solicitation',
        component: SolicitationComponent,
        children: [
            { path: 'report', component: SolicitationReportComponent, canActivate: [AuthGuard] },
            { path: 'report/:id', component: ResultsDetailComponent, canActivate: [AuthGuard] },
            { path: 'email/:id', component: EmailPocComponent, canActivate: [AuthGuard] },
            { path: 'feedback/:id', component: HelpUsImproveComponent, canActivate: [AuthGuard] },
            { path: 'feedback', component: FeedbackReportComponent, canActivate: [AuthGuard] },
            { path: 'feedback/form/:id', component: FormComponent, canActivate: [AuthGuard] },
            { path: 'history/:id', component: HistoryComponent, canActivate: [AuthGuard] },
        ]
    },

]

export const SolicitationRoutes = RouterModule.forChild(solicitationRoutes);
