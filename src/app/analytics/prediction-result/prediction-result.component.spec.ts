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
});
