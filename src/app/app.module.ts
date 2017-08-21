//
// MODULES
//

//// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

//// Built modules
import { AnalyticsModule } from '../analytics/analytics.module';
import { HelpModule } from '../help/help.module'

//// Open Sources Modules
import { DataTableModule,SharedModule, ButtonModule, DropdownModule, CalendarModule} from 'primeng/primeng';
import { TooltipModule } from "ng2-tooltip";
import { QuillEditorModule } from 'ngx-quill-editor';
import { Ng2CompleterModule } from "ng2-completer";

//
// SERVICES
//
import { AgencyService } from './agency.service';
import { AuthService } from './auth/auth.service';
import { SolicitationService } from './solicitation.service';
import { SurveyService } from './survey.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service'


//
// COMPONENTS
//

import { AppComponent } from './app.component';
import { SolicitationReportComponent } from './report/solicitation-report/solicitation-report.component';


// ROUTES
import { routing } from './app.routing';
import { HelpRoutes } from '../help/help.routing';


import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { UserloginComponent } from './auth/userlogin/userlogin.component';
import { UserregistrationComponent } from './auth/userregistration/userregistration.component';
import { SolicitationReviewComponent } from './solicitation-review/solicitation-review.component';
import { SrtComponent } from './srt/srt.component';
import { AdminComponent } from './admin/admin.component';
import { ReportComponent } from './report/report.component';
import { SummaryComponent } from './report/summary/summary.component';
import { ResultsDetailComponent } from './report/summary/results-detail/results-detail.component';
import { HelpUsImproveComponent } from './report/summary/help-us-improve/help-us-improve.component';
import { EmailPocComponent } from './report/summary/email-poc/email-poc.component';
import { HistoryComponent } from './report/summary/history/history.component';
import { PendingComponent } from './admin/pending/pending.component';
import { ApprovedComponent } from './admin/approved/approved.component';
import { DeniedComponent } from './admin/denied/denied.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';






@NgModule({
  declarations: [
    AppComponent,
    SolicitationReportComponent,
    HeaderComponent,
    ReportComponent,
    AuthComponent,
    UserloginComponent,
    UserregistrationComponent,
    SolicitationReviewComponent,
    SrtComponent,
    AdminComponent,
    ResultsDetailComponent,
    EmailPocComponent,
    HelpUsImproveComponent,
    SummaryComponent,
    HistoryComponent,
    PendingComponent,
    ApprovedComponent,
    DeniedComponent,
    ProfileComponent,
    PasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    DataTableModule,
    SharedModule,
    ButtonModule,
    DropdownModule,
    TooltipModule,
    CalendarModule,
    // FroalaEditorModule.forRoot(), 
    // FroalaViewModule.forRoot(),
    Ng2CompleterModule,
    QuillEditorModule,
    AnalyticsModule,
    HelpModule,
    HelpRoutes,
  ],
  providers: [
    SolicitationService,
    AuthService,
    UserService,
    AgencyService,
    SurveyService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
