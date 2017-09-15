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
// import { QuillEditorModule } from 'ngx-quill-editor';
import { Ng2CompleterModule } from "ng2-completer";

//
// SERVICES
//
import { AgencyService } from './agency.service';
import { AuthService } from './auth/auth.service';
import { SurveyService } from './survey.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service'


//
// COMPONENTS
//

import { AppComponent } from './app.component';


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
import { PendingComponent } from './admin/pending/pending.component';
import { ApprovedComponent } from './admin/approved/approved.component';
import { DeniedComponent } from './admin/denied/denied.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';




import { SolicitationModule } from './solicitation/solicitation.module';
import { SolicitationRoutes } from './solicitation/solicitation.routing';
// import { SolicitationService } from './solicitation/solicitation.service';
// import { SolicitationReportComponent } from './solicitation/solicitation-report/solicitation-report.component';
// import { SummaryComponent } from './solicitation/summary/summary.component';
// import { ResultsDetailComponent } from './solicitation/summary/results-detail/results-detail.component';
// import { HelpUsImproveComponent } from './solicitation/summary/help-us-improve/help-us-improve.component';
// import { EmailPocComponent } from './solicitation/summary/email-poc/email-poc.component';
// import { HistoryComponent } from './solicitation/summary/history/history.component';
// import { SolicitationComponent } from './solicitation/solicitation.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    UserloginComponent,
    UserregistrationComponent,
    SolicitationReviewComponent,
    SrtComponent,
    AdminComponent,
    PendingComponent,
    ApprovedComponent,
    DeniedComponent,
    ProfileComponent,
    PasswordComponent,

    // SolicitationReportComponent,
    // ReportComponent,
    // ResultsDetailComponent,
    // EmailPocComponent,
    // HelpUsImproveComponent,
    // SummaryComponent,
    // HistoryComponent,
    // SolicitationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    TooltipModule,

    DataTableModule,
    SharedModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    // FroalaEditorModule.forRoot(),
    // FroalaViewModule.forRoot(),
    Ng2CompleterModule,
    // QuillEditorModule,
    AnalyticsModule,
    HelpModule,
    HelpRoutes,
    SolicitationModule,
    SolicitationRoutes,
  ],
  providers: [
    // SolicitationService,
    AuthService,
    UserService,
    AgencyService,
    SurveyService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
