import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationResultComponent } from './solicitation-result.component';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';

describe('SolicitationResultComponent', () => {
  let component: SolicitationResultComponent;
  let fixture: ComponentFixture<SolicitationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitationResultComponent ],
      providers: [BaseChartDirective],
      imports: [NgChartsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set pie chart data when SolicitationResultChart is defined and hasValue is false', () => {
    const chart = {
      compliance: 10,
      uncompliance: 5,
      notApplicable: 3,
      cannotEvaluate: 2,
    };
    component.SolicitationResultChart = chart;
    component.hasValue = false;
    component.ngOnChanges();
    expect(component.numCompliant).toEqual(chart.compliance);
    expect(component.numNonCompliant).toEqual(chart.uncompliance);
    expect(component.numNotApplicable).toEqual(chart.notApplicable);
    expect(component.numCannotEvaluate).toEqual(chart.cannotEvaluate);
    expect(component.pieChartData.labels).toEqual(component.pieChartLabels);
    expect(component.pieChartData.datasets[0].data).toEqual([
      chart.compliance,
      chart.uncompliance,
      chart.notApplicable,
      chart.cannotEvaluate,
    ]);
    expect(component.pieChartData.datasets[0].backgroundColor).toEqual([
      '#2C81C0',
      '#ff0000',
      '#e8e8e8',
      '#FFB300',
    ]);
    expect(component.pieChartData.datasets[0].borderColor).toEqual([
      '#2C81C0',
      '#ff0000',
      '#e8e8e8',
      '#FFB300',
    ]);
    expect(component.hasValue).toBeTrue();
  });

});
