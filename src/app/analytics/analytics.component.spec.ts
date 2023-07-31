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
                      DonutChartComponent, ],
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
