import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// open sources modules
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TooltipModule } from "ng2-tooltip";

// main component
import { AnalyticsComponent } from './analytics.component'

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

import { AnalyticsService } from './services/analytics.service';
import { DonutChartComponent } from './donut-chart/donut-chart.component'

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ChartsModule,
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
