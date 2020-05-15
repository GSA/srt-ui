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
    LoginReportService
  ],
  exports: [
    MasqComponent,
    UserReportComponent
  ],
  declarations: [
    MasqComponent,
    UserReportComponent
  ]
})
  export class AdminModule { }
