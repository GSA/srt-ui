import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsComponent } from './analytics.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AnalyticsService } from './services/analytics.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Globals } from 'globals';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { NgChartsModule } from 'ng2-charts';


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


import {of} from 'rxjs';

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsComponent, TopSrtActionsComponent,
                      TopAgenciesComponent, ScannedSolicitationComponent,
                      UserLoginComponent, MachineReadableComponent,
                      PredictionResultComponent, TopAgenciesPercentageComponent,
                      UndeterminedSolicitationsComponent, LineChartsComponent,
                      DonutChartComponent, SolicitationResultComponent],
      providers: [Globals, AnalyticsService, BaseChartDirective],
      imports: [NgChartsModule, TooltipModule, FormsModule, RouterTestingModule.withRoutes([]), HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeAll(() => {
    let store = {
      'agency': 'Department of Testing',
      'userRole': 'customer test'
    } as any;
  
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        for (var member in store) delete store[member];
      }};
  
      spyOn(window.localStorage, 'getItem')
        .and.callFake(mockLocalStorage.getItem);
      spyOn(Storage.prototype, 'setItem')
        .and.callFake(mockLocalStorage.setItem);
      spyOn(Storage.prototype, 'removeItem')
        .and.callFake(mockLocalStorage.removeItem);
      spyOn(Storage.prototype, 'clear')
        .and.callFake(mockLocalStorage.clear);
  
    });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.selectedGovernment = 'Test Agency';

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get analytics data', () => {
    const analyticsService = TestBed.inject(AnalyticsService);
    spyOn(analyticsService, 'getAnalytics').and.returnValue(of({
      ScannedSolicitationChart: {},
      solStats: {},
      MachineReadableChart: {},
      ComplianceRateChart: {},
      ConversionRateChart: {},
      TopSRTActionChart: {},
      TopAgenciesChart: {},
      PredictResultChart: {},
      UndeterminedSolicitationChart: {}
    }));
    component.formPeriod = new Date('2022-01-01T12:00:00.000Z');
    component.toPeriod = new Date('2022-01-31T12:00:00.000Z');
    component.selectedGovernment = 'test';
    component.GetTotalData();
    expect(analyticsService.getAnalytics).toHaveBeenCalledWith({
      fromPeriod: '1/1/2022',
      toPeriod: '1/31/2022',
      agency: 'test'
    });
    expect(component.ScannedSolicitationChart).toEqual({});
    expect(component.solStats).toEqual({});
    expect(component.MachineReadableChart).toEqual({});
    expect(component.ComplianceRateChart).toEqual({});
    expect(component.ConversionRateChart).toEqual({});
    expect(component.TopSRTActionChart).toEqual({
      params: {
        fromPeriod: '1/1/2022',
        toPeriod: '1/31/2022',
        agency: 'test'
      }
    });
    expect(component.TopAgenciesChart).toEqual({});
    expect(component.PredictResultChart).toEqual({});
    expect(component.UndeterminedSolicitationChart).toEqual({});
    expect(component.filterActionChange).toBeFalse();
  });

  it('should set agency list to current agency', () => {
    localStorage.setItem('agency', 'Department of Testing');
    localStorage.setItem('userRole', 'Testing Role')
    component.GetAgencyList();
    expect(localStorage.getItem).toHaveBeenCalledWith('agency');
    expect(localStorage.getItem).toHaveBeenCalledWith('userRole');
    expect(component.agencyList).toEqual(['Department of Testing']);
  });

  it('should get agency list', () => {
    const analyticsService = TestBed.inject(AnalyticsService);
    localStorage.setItem('agency', 'General Services Administration');
    localStorage.setItem('userRole', 'Administrator');

    spyOn(analyticsService, 'GetAgencyList').and.returnValue(of(['test1', 'test2']));
    component.GetAgencyList();
    expect(localStorage.getItem).toHaveBeenCalledWith('agency');
    expect(localStorage.getItem).toHaveBeenCalledWith('userRole');
    expect(analyticsService.GetAgencyList).toHaveBeenCalled();
    expect(component.agencyList).toEqual(['test1', 'test2']);
  });
  
  it('should set time period to current year', () => {
    const currentYear = new Date().getFullYear();
    component.onPeriodChange('This Year');
    expect(component.selectedPeriod).toEqual('This Year');
    expect(component.filterActionChange).toBeTrue();
    expect(component.formPeriod).toEqual(new Date(currentYear, 0, 1));
    expect(component.toPeriod).toEqual(new Date(currentYear, 11, 31));
    expect(component.xAxis).toEqual('Month');
  });

  it('should set time period to current month', () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    component.onPeriodChange('This Month');
    expect(component.selectedPeriod).toEqual('This Month');
    expect(component.filterActionChange).toBeTrue();
    expect(component.formPeriod).toEqual(new Date(currentYear, currentMonth, 1));
    expect(component.toPeriod).toEqual(new Date(currentYear, currentMonth + 1, 0));
    expect(component.xAxis).toEqual('Date');
  });

  it('should set time period to current week', () => {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();
    const last = first + 6;
    component.onPeriodChange('This Week');
    expect(component.selectedPeriod).toEqual('This Week');
    expect(component.filterActionChange).toBeTrue();
    expect(component.formPeriod).toEqual(new Date(curr.setDate(first)));
    expect(component.toPeriod).toEqual(new Date(curr.setDate(last)));
  });

  it('should set time period to default', () => {
    component.onPeriodChange('Invalid Period');
    expect(component.selectedPeriod).toEqual('Invalid Period');
    expect(component.filterActionChange).toBeTrue();
    expect(component.formPeriod).toEqual(new Date(1900, 0, 1));
    expect(component.toPeriod).toEqual(new Date(2100, 0, 1));
  });

  it('should set xAxis to Agency when selectedGovernment is Government-wide', () => {
    component.selectedGovernment = 'Government-wide';
    component.onPeriodChange('This Year');
    expect(component.xAxis).toEqual('Agency');
  });

});
