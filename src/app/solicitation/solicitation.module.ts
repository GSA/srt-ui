import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule, ButtonModule, DropdownModule, CalendarModule} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { QuillEditorModule } from 'ngx-quill-editor';

import { SolicitationRoutesModule } from './solicitation.routing';


import { SolicitationService } from './solicitation.service';
import { AuthGuard } from '../auth-guard.service';

import { SolicitationReportComponent } from './solicitation-report/solicitation-report.component';
import { SummaryComponent } from './summary/summary.component';
import { ResultsDetailComponent } from './summary/results-detail/results-detail.component';
import { HelpUsImproveComponent } from './summary/help-us-improve/help-us-improve.component';
import { EmailPocComponent } from './summary/email-poc/email-poc.component';
import { HistoryComponent } from './summary/history/history.component';
import { SolicitationComponent } from './solicitation.component';
import { FeedbackReportComponent } from './feedback-report/feedback-report.component';
import { FormComponent } from './feedback-report/form/form.component';
import { PredictionHistoryComponent } from './summary/prediction-history/prediction-history.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    TableModule,
    SharedModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    TooltipModule,
    SolicitationRoutesModule,

    QuillEditorModule,
  ],
  declarations: [
    SolicitationReportComponent,
    ResultsDetailComponent,
    EmailPocComponent,
    HelpUsImproveComponent,
    SummaryComponent,
    HistoryComponent,
    SolicitationComponent,
    FeedbackReportComponent,
    FormComponent,
    PredictionHistoryComponent,

  ],
  providers: [
    SolicitationService,
    AuthGuard
  ],
  exports: [
    SolicitationComponent
  ]
})
export class SolicitationModule { }
