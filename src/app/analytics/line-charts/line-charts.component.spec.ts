import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartsComponent } from './line-charts.component';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';


describe('LineChartsComponent', () => {
  let component: LineChartsComponent;
  let fixture: ComponentFixture<LineChartsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartsComponent ],
      providers: [BaseChartDirective],
      imports: [NgChartsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set lineChartData and lineChartLabels when TopAgenciesChart is set and selectedPeriod is This Year', () => {
    const topAgenciesChart = {
      topAgencies: {
        'selectedGovernment': [
          { date: '2021-01-01', predictions: { value: 'green' } },
          { date: '2021-01-02', predictions: { value: 'red' } },
          { date: '2021-02-01', predictions: { value: 'green' } },
          { date: '2021-02-02', predictions: { value: 'green' } },
          { date: '2021-03-01', predictions: { value: 'red' } },
          { date: '2021-03-02', predictions: { value: 'green' } },
          { date: '2021-04-01', predictions: { value: 'green' } },
          { date: '2021-04-02', predictions: { value: 'green' } },
          { date: '2021-05-01', predictions: { value: 'green' } },
          { date: '2021-05-02', predictions: { value: 'green' } },
          { date: '2021-06-01', predictions: { value: 'green' } },
          { date: '2021-06-02', predictions: { value: 'green' } },
          { date: '2021-07-01', predictions: { value: 'green' } },
          { date: '2021-07-02', predictions: { value: 'green' } },
          { date: '2021-08-01', predictions: { value: 'green' } },
          { date: '2021-08-02', predictions: { value: 'green' } },
          { date: '2021-09-01', predictions: { value: 'green' } },
          { date: '2021-09-02', predictions: { value: 'green' } },
          { date: '2021-10-01', predictions: { value: 'green' } },
          { date: '2021-10-02', predictions: { value: 'green' } },
          { date: '2021-11-01', predictions: { value: 'green' } },
          { date: '2021-11-02', predictions: { value: 'green' } },
          { date: '2021-12-01', predictions: { value: 'green' } },
          { date: '2021-12-02', predictions: { value: 'green' } },
        ]
      }
    };
    component.TopAgenciesChart = topAgenciesChart;
    component.selectedGovernment = 'selectedGovernment';
    component.selectedPeriod = 'This Year';
    component.ngOnChanges();
    expect(component.lineChartData).toEqual([{ data: [50, 100, 50, 100, 100, 100, 100, 100, 100, 100, 100, 100] }]);
    expect(component.lineChartLabels).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  });

  it('should set lineChartData and lineChartLabels when TopAgenciesChart is set and selectedPeriod is This Month', () => {
    const topAgenciesChart = {
      topAgencies: {
        'selectedGovernment': [
          { date: '2021-11-01T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-02T12:00:00.000Z', predictions: { value: 'red' } },
          { date: '2021-11-03T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-04T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-05T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-06T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-07T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-08T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-09T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-10T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-11T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-12T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-13T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-14T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-15T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-16T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-17T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-18T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-19T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-20T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-21T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-22T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-23T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-24T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-25T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-26T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-27T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-28T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-29T12:00:00.000Z', predictions: { value: 'green' } },
          { date: '2021-11-30T12:00:00.000Z', predictions: { value: 'green' } },
        ]
      }
    };
    component.TopAgenciesChart = topAgenciesChart;
    component.selectedGovernment = 'selectedGovernment';
    component.selectedPeriod = 'This Month';
    component.toPeriod = new Date('2021-11-30T12:00:00.000Z');
    component.fromPeriod = new Date('2021-11-01T12:00:00.000Z');

    component.ngOnChanges();

    let expectedLineChartData = Array(30).fill(100);
    expectedLineChartData[1] = 0

    expect(component.lineChartData).toEqual([{ data: expectedLineChartData }]);
    console.log('lineChartDatas', component.lineChartData);
    expect(component.lineChartLabels).toEqual(['11/1', '11/2', '11/3', '11/4', '11/5', '11/6', '11/7', '11/8', '11/9', '11/10', '11/11', '11/12', '11/13', '11/14', '11/15', '11/16', '11/17', '11/18', '11/19', '11/20', '11/21', '11/22', '11/23', '11/24', '11/25', '11/26', '11/27', '11/28', '11/29', '11/30']);
  });

  
});
