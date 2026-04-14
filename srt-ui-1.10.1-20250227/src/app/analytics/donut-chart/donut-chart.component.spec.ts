import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutChartComponent } from './donut-chart.component';
import { TooltipModule } from 'primeng/tooltip';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';



describe('DonutChartComponent', () => {
  let component: DonutChartComponent;
  let fixture: ComponentFixture<DonutChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutChartComponent ],
      providers: [BaseChartDirective],
      imports: [TooltipModule, NgChartsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct percentage', () => {
    component.doughnutChartDataInput = {
      updatedCompliantICT: 10,
      uncompliance: 20
    };
    component.title = 'Conversion Rate';
    component.ngOnChanges()
    expect(component.percentage).toEqual(50);
    expect(component.note).toContain('non-compliant ICT solicitations became compliant after they were updated sam.gov.');

  });

  it('should have the correct reader supplement', () => {
    component.doughnutChartDataInput = {
      updatedCompliantICT: 10,
      uncompliance: 20
    };
    component.title = 'Conversion Rate';
    component.ngOnChanges()
    expect(component.readerSupplement).toContain('That is a 50 percent conversion rate.');
  });

  it('should have the correct doughnut chart data', () => {
    component.doughnutChartDataInput = {
      compliance: 10,
      determinedICT: 20
    };
    component.title = 'Preliminary Compliance Rate';
    component.ngOnChanges()
    expect(component.doughnutChartData.datasets[0].data).toEqual([10, 10]);
  });

  it('should have the correct percentage', () => {
    component.doughnutChartDataInput = {
      compliance: 10,
      determinedICT: 20
    };
    component.title = 'Preliminary Compliance Rate';
    component.ngOnChanges()
    expect(component.percentage).toEqual(50);
  });

});
