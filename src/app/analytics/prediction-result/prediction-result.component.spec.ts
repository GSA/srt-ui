import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionResultComponent } from './prediction-result.component';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import {Globals} from 'globals';

describe('PredictionResultComponent', () => {
  let component: PredictionResultComponent;
  let fixture: ComponentFixture<PredictionResultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionResultComponent ],
      providers: [Globals, BaseChartDirective],
      imports: [NgChartsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set pieChartData when PredictResultChart is set', () => {
    const predictResultChart = { compliance: 10, uncompliance: 5 };
    component.PredictResultChart = predictResultChart;
    component.ngOnChanges();
    expect(component.pieChartData).toEqual({
      labels: ['10 Compliant 66.7%', '5 Non-compliant 33.3%'],
      datasets: [{
        data: [10, 5],
        backgroundColor: ['#2C81C0', '#ff0000'],
        borderColor: ['#2C81C0', '#ff0000']
      }]
    });
  });

});
