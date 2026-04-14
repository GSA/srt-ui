import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineReadableComponent } from './machine-readable.component';
import {BaseChartDirective} from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';

describe('MachineReadableComponent', () => {
  let component: MachineReadableComponent;
  let fixture: ComponentFixture<MachineReadableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineReadableComponent ],
      providers: [BaseChartDirective],
      imports: [NgChartsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineReadableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set pieChartData when MachineReadableChart is set', () => {
    const machineReadableChart = { machineReadable: 10, machineUnreadable: 5 };
    component.MachineReadableChart = machineReadableChart;

    component.ngOnChanges();
    expect(component.pieChartData).toEqual([10, 5]);
    expect(component.displayReadable).toEqual('66.7%');
    expect(component.displayUnreadable).toEqual('33.3%');

  });

});
