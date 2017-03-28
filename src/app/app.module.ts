import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { SolicitationReportComponent } from './report/solicitation-report/solicitation-report.component';
import { SolicitationService } from './solicitation.service';
import { UserService } from './user.service';

import {DataTableModule,SharedModule, ButtonModule} from 'primeng/primeng';
import { routing } from './app.routing';
import { HeaderComponent } from './header/header.component';
import { ReportComponent } from './report/report.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { UserloginComponent } from './auth/userlogin/userlogin.component';
import { UserregistrationComponent } from './auth/userregistration/userregistration.component';
import { SolicitationReviewComponent } from './solicitation-review/solicitation-review.component';
import { SrtComponent } from './srt/srt.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AdminComponent } from './admin/admin.component';

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
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    DataTableModule,
    SharedModule,
    ButtonModule
  ],
  providers: [
    SolicitationService,
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
