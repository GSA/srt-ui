import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';

// MODULES
import { AnalyticsModule } from './analytics/analytics.module';
import { HelpModule } from './help/help.module';
import { SolicitationModule } from './solicitation/solicitation.module';
import { DataTableModule,SharedModule, ButtonModule, DropdownModule, CalendarModule} from 'primeng/primeng';
import { TooltipModule } from "ng2-tooltip";
import { Ng2CompleterModule } from "ng2-completer";

// SERVICES

import { AgencyService } from './agency.service';
import { AuthService } from './auth/auth.service';
import { SurveyService } from './survey.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service'

// COMPONENTS

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { UserloginComponent } from './auth/userlogin/userlogin.component';
import { UserregistrationComponent } from './auth/userregistration/userregistration.component';
import { SolicitationReviewComponent } from './solicitation-review/solicitation-review.component';
import { SrtComponent } from './srt/srt.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';

// ROUTES
import { routing } from './app.routing';
import { HelpRoutes } from './help/help.routing';
import { SolicitationRoutes } from './solicitation/solicitation.routing';

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
    TooltipModule,

    DataTableModule,
    SharedModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    Ng2CompleterModule,
    AnalyticsModule,
    HelpModule,
    HelpRoutes,
    SolicitationModule,
    SolicitationRoutes,
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
