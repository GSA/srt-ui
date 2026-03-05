import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
import { SolicitationResultComponent } from './solicitation-result/solicitation-result.component';

// Service
import { AnalyticsService } from './services/analytics.service';

@NgModule({ declarations: [
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
        SolicitationResultComponent,
    ],
    exports: [
        AnalyticsComponent
    ], imports: [CommonModule,
        NgChartsModule,
        FormsModule,
        ReactiveFormsModule,
        TooltipModule,
        RouterModule], providers: [
        AnalyticsService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AnalyticsModule { }
