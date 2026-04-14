import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndeterminedSolicitationsComponent } from './undetermined-solicitations.component';
import {BaseChartDirective} from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';

describe('UndeterminedSolicitationsComponent', () => {
  let component: UndeterminedSolicitationsComponent;
  let fixture: ComponentFixture<UndeterminedSolicitationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UndeterminedSolicitationsComponent ],
      providers: [BaseChartDirective],
      imports: [NgChartsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndeterminedSolicitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set pieChartData when UndeterminedSolicitationChart is set', () => {
    const chartData = {
      presolicitation: 10,
      latestOtherUndetermined: 20,
      latestNonMachineReadable: 5,
      latestNoDocument: 15
    };
    component.UndeterminedSolicitationChart = chartData;
    component.ngOnChanges();
    expect(component.pieChartData).toEqual({
      labels: ['Presolicitation', 'Other Undetermined', '0 Documents', 'Non-Machine Readable'],
      datasets: [{
        data: [10, 20, 15, 5],
        backgroundColor: ['#2C81C0', '#ff0000', '#e8e8e8', '#FFB300'],
        hoverBackgroundColor: ['#2C81C0', '#ff0000', '#e8e8e8', '#FFB300']
      }]
    });
  });

  it('should set display percentages when UndeterminedSolicitationChart is set', () => {
    const chartData = {
      presolicitation: 10,
      latestOtherUndetermined: 20,
      latestNonMachineReadable: 5,
      latestNoDocument: 15
    };
    component.UndeterminedSolicitationChart = chartData;
    component.ngOnChanges();
    expect(component.displayPresolicitation).toBe('20%');
    expect(component.displayOtherUndetermined).toBe('40%');
    expect(component.displayNoDocument).toBe('30%');
    expect(component.displayNonMachineReadable).toBe('10%');
  });

  it('should call forceChartRefresh after setting pieChartData', () => {
    spyOn(component, 'forceChartRefresh');
    const chartData = {
      presolicitation: 10,
      latestOtherUndetermined: 20,
      latestNonMachineReadable: 5,
      latestNoDocument: 15
    };
    component.UndeterminedSolicitationChart = chartData;
    component.ngOnChanges();
    expect(component.forceChartRefresh).toHaveBeenCalled();
  });

});
