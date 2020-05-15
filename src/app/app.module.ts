import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



// MODULES
import { AnalyticsModule } from './analytics/analytics.module';
import { HelpModule } from './help/help.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { AdminModule } from 'app/admin/admin.module';
import { TokenService } from './shared/services/token.service';
import { ChartModule } from 'primeng/chart';


import { SolicitationModule } from './solicitation/solicitation.module';
import { SharedModule, ButtonModule, DropdownModule, CalendarModule} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'ng2-tooltip';
import { Ng2CompleterModule } from 'ng2-completer';

// SERVICES

import { AgencyService } from './shared/services/agency.service';
import { AuthService } from './shared/services/auth.service';
import { SurveyService } from './survey.service';
import { MasqService } from './user/masq/masq.service';
import { UserService } from './shared/services/user.service';
import { AuthGuard } from './auth-guard.service';
import { NoticeTypesService } from './shared/services/noticeTypes.service';
import { VersionService } from './shared/services/version.service';

// COMPONENTS

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from 'app/admin/admin.component';
import { AdminReportsComponent} from './admin/admin-reports/admin-reports.component';
import { TokenInterceptor } from './shared/services/token.interceptor';


// ROUTES
import { AppRoutingModule } from './app.routing';
import {UploadComponent} from './shared/components/upload/upload.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {Globals} from '../globals';
import {AdminGuard} from './admin-guard.service';
import {BaseComponent} from './base.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    UploadComponent,
    BaseComponent,
    AdminHeaderComponent,
    AdminReportsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    TooltipModule,
    AuthModule,
    HomeModule,
    HelpModule,
    AdminModule,
    TableModule,
    SharedModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    Ng2CompleterModule,
    AnalyticsModule,
    SolicitationModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG} ),
    ChartModule
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
