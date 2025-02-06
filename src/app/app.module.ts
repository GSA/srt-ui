import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Feature Modules
import { AnalyticsModule } from './analytics/analytics.module';
import { HelpModule } from './help/help.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { AdminModule } from 'app/admin/admin.module';
import { SolicitationModule } from './solicitation/solicitation.module';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChartModule } from 'primeng/chart';

// Third Party Modules
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

// Services
import { TokenService } from './shared/services/token.service';
import { AgencyService } from './shared/services/agency.service';
import { AuthService } from './shared/services/auth.service';
import { SurveyService } from './survey.service';
import { MasqService } from './user/masq/masq.service';
import { UserService } from './shared/services/user.service';
import { AuthGuard } from './auth-guard.service';
import { AdminGuard } from './admin-guard.service';
import { NoticeTypesService } from './shared/services/noticeTypes.service';
import { ArtService } from './solicitation/summary/results-detail/art-modal/art.service';
import { TokenInterceptor } from './shared/services/token.interceptor';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from 'app/admin/admin.component';
import { LoginReportsComponent } from './admin/admin-reports/login-reports.component';
import { UploadComponent } from './shared/components/upload/upload.component';
import { BaseComponent } from './base.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { TestModalComponent } from './test-modal/test-modal.component';

// Routes
import { AppRoutingModule } from './app.routing';
import { Globals } from '../globals';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    UploadComponent,
    BaseComponent,
    AdminHeaderComponent,
    LoginReportsComponent,
    TestModalComponent
  ],
  imports: [
    // Angular Core Modules
    CommonModule,
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    
    // Feature Modules
    AuthModule,
    HomeModule,
    HelpModule,
    AdminModule,
    AnalyticsModule,
    SolicitationModule, // Import SolicitationModule only once
    
    // PrimeNG Modules
    TooltipModule,
    DialogModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    AutoCompleteModule,
    ChartModule,
    
    // Third Party Modules
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
    NgxGoogleAnalyticsModule.forRoot('G-RZRRP7Q0BH'),
    NgxGoogleAnalyticsRouterModule
  ],
  providers: [
    AuthService,
    UserService,
    AgencyService,
    SurveyService,
    MasqService,
    TokenService,
    AuthGuard,
    AdminGuard,
    NoticeTypesService,
    ArtService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    Globals,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }