import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

/* Services */
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { EmailService } from '../shared/services/email.service';
import { FileService } from '../shared/services/file.service';
import { LoginReportService } from './admin-reports/login-report.service';
import { FeedbackReportService } from './admin-reports/feedback-report.service';
import { UserPermissionsService } from './user-permissions/user-permissions.service';

/* Components */
import { MasqComponent } from '../user/masq/masq.component';
import { MetricDownloadsComponent } from './metric-downloads/metric-downloads.component';
import { UserReportComponent } from '../user/reports/user.report.component';
import { FeedbackReportTableComponent } from './admin-reports/feedback-report-table.component';
import { UserPermissionsComponent } from './user-permissions/user-permissions.component';

/* UI libs (PrimeNG) */
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';

/* Routing */
import { UserRoutingModule } from './admin.routing';

@NgModule({
  declarations: [
    MasqComponent,
    MetricDownloadsComponent,
    UserReportComponent,
    FeedbackReportTableComponent,
    UserPermissionsComponent            // NEW
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,                   // NEW (for API calls)
    RouterModule,
    UserRoutingModule,
    /* PrimeNG */
    TableModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    AutoCompleteModule,
    FileUploadModule
  ],
  providers: [
    UserService,
    AuthService,
    EmailService,
    FileService,
    LoginReportService,
    FeedbackReportService,
    UserPermissionsService              // NEW
  ],
  exports: [
    MasqComponent,
    MetricDownloadsComponent,
    UserReportComponent,
    FeedbackReportTableComponent,
    UserPermissionsComponent            // optional: export if used elsewhere
  ]
})
export class AdminModule { }
