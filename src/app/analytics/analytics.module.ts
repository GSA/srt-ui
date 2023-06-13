import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// open sources modules
import { NgChartsModule } from 'ng2-charts';
import { TooltipModule } from 'primeng/tooltip';
// main component
import { AnalyticsComponent } from './analytics.component';

// children components
import { TopSrtActionsComponent } from './top-srt-actions/top-srt-actions.component';
import { TopAgenciesComponent } from './top-agencies/top-agencies.component';
import { ScannedSolicitationComponent } from './scanned-solicitation/scanned-solicitation.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { MachineReadableComponent } from './machine-readable/machine-readable.component';
import { PredictionResultComponent } from './prediction-result/prediction-result.component';
import { TopAgenciesPercentageComponent } from './top-agencies-percentage/top-agencies-percentage.component';
import { UndeterminedSolicitationsComponent } from './undetermined-solicitations/undetermined-solicitations.component';
import { LineChartsComponent } from './line-charts/line-charts.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';

// Service
import { AnalyticsService } from './services/analytics.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    RouterModule
  ],
  declarations: [
    AnalyticsComponent,
    TopSrtActionsComponent,
    TopAgenciesComponent,
    ScannedSolicitationComponent,
    UserLoginComponent,
    MachineReadableComponent,
    PredictionResultComponent,
    TopAgenciesPercentageComponent,
    UndeterminedSolicitationsComponent,
    LineChartsComponent,
    DonutChartComponent,
  ],
  providers: [
    AnalyticsService
  ],
  exports: [
    AnalyticsComponent
  ]
})
export class AnalyticsModule { }
