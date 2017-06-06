import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { SolicitationReportComponent } from './report/solicitation-report/solicitation-report.component';
import { SolicitationService } from './solicitation.service';
import { UserService } from './user.service';

import { DataTableModule,SharedModule, ButtonModule, DropdownModule} from 'primeng/primeng';
import { routing } from './app.routing';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { UserloginComponent } from './auth/userlogin/userlogin.component';
import { UserregistrationComponent } from './auth/userregistration/userregistration.component';
import { SolicitationReviewComponent } from './solicitation-review/solicitation-review.component';
import { SrtComponent } from './srt/srt.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AdminComponent } from './admin/admin.component';
import { FaqComponent } from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
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

import {TooltipModule} from "ng2-tooltip";
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

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
    AnalyticsComponent,
    AdminComponent,
    ResultsDetailComponent,
    EmailPocComponent,
    FaqComponent,
    ContactUsComponent,
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
    ChartsModule,
    TooltipModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  providers: [
    SolicitationService,
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
