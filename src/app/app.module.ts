import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// MODULES
import { AnalyticsModule } from './analytics/analytics.module';
import { HelpModule } from './help/help.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { UserModule } from 'app/user/user.module';




import { SolicitationModule } from './solicitation/solicitation.module';
import { DataTableModule,SharedModule, ButtonModule, DropdownModule, CalendarModule} from 'primeng/primeng';
import { TooltipModule } from "ng2-tooltip";
import { Ng2CompleterModule } from "ng2-completer";

// SERVICES

import { AgencyService } from './shared/services/agency.service';
import { AuthService } from './shared/services/auth.service';
import { SurveyService } from './survey.service';
import { UserService } from './shared/services/user.service';
import { AuthGuard } from './auth-guard.service'

// COMPONENTS

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from 'app/admin/admin.component';
import { SolicitationReviewComponent } from './solicitation-review/solicitation-review.component';


// ROUTES
import { AppRoutingModule } from './app.routing';
import {UploadComponent} from './shared/components/upload/upload.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    SolicitationReviewComponent,
    HeaderComponent,
    AdminComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TooltipModule,
    AuthModule,
    HomeModule,
    HelpModule,
    UserModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    Ng2CompleterModule,
    AnalyticsModule,
    SolicitationModule,
  ],
  providers: [
    AuthService,
    UserService,
    AgencyService,
    SurveyService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
