import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
import { SharedModule, ButtonModule, DropdownModule, CalendarModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { Ng2CompleterModule } from 'ng2-completer';
import { FileUploadModule } from 'primeng/primeng';
import {MasqComponent} from '../user/masq/masq.component';
import {UserReportComponent} from '../user/reports/user.report.component';
import {FeedbackReportTableComponent} from './admin-reports/feedback-report-table.component';
import {FeedbackReportService} from './admin-reports/feedback-report.service';



@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    TableModule,
    SharedModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
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
    UserReportComponent,
    FeedbackReportTableComponent
  ],
  declarations: [
    MasqComponent,
    UserReportComponent,
    FeedbackReportTableComponent
  ]
})
  export class AdminModule { }
