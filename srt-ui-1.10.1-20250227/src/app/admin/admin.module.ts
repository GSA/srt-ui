import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';


// Services
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { EmailService } from '../shared/services/email.service';
import { FileService } from 'app/shared/services/file.service';
import { LoginReportService } from './admin-reports/login-report.service';


// Routes
import { UserRoutingModule } from './admin.routing';


// Components

// Open Sources
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import {MasqComponent} from '../user/masq/masq.component';
import {MetricDownloadsComponent} from './metric-downloads/metric-downloads.component';
import {UserReportComponent} from '../user/reports/user.report.component';
import {FeedbackReportTableComponent} from './admin-reports/feedback-report-table.component';
import {FeedbackReportService} from './admin-reports/feedback-report.service';



@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    FileUploadModule,
  ],
  providers: [
    UserService,
    AuthService,
    EmailService,
    FileService,
    LoginReportService,
    FeedbackReportService
  ],
  exports: [
    MasqComponent,
    MetricDownloadsComponent,
    UserReportComponent,
    FeedbackReportTableComponent
  ],
  declarations: [
    MasqComponent,
    MetricDownloadsComponent,
    UserReportComponent,
    FeedbackReportTableComponent
  ]
})
  export class AdminModule { }
