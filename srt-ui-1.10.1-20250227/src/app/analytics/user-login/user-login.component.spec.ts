import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginComponent } from './user-login.component';
import { BaseChartDirective, NgChartsModule} from 'ng2-charts';


describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginComponent ],
      providers: [BaseChartDirective],
      imports: [NgChartsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set lineChartLabels for a 31-day period', () => {
    component.fromPeriod = new Date(2022, 0, 1);
    component.toPeriod = new Date(2022, 0, 31);
    component.ngDoCheck();
    expect(component.lineChartLabels.length).toEqual(31);
    expect(component.lineChartLabels[0]).toEqual('1/1');
    expect(component.lineChartLabels[30]).toEqual('1/31');
  });

  it('should set lineChartLabels for a 32-day period', () => {
    component.fromPeriod = new Date(2022, 0, 1);
    component.toPeriod = new Date(2022, 1, 1);
    component.ngDoCheck();
    expect(component.lineChartLabels.length).toEqual(32);
    expect(component.lineChartLabels[0]).toEqual('1/1');
    expect(component.lineChartLabels[31]).toEqual('2/1');
  });

  it('should set lineChartLabels for a 1-day period', () => {
    component.fromPeriod = new Date(2022, 0, 1);
    component.toPeriod = new Date(2022, 0, 1);
    component.ngDoCheck();
    expect(component.lineChartLabels.length).toEqual(1);
    expect(component.lineChartLabels[0]).toEqual('1/1');
  });

  it('should not set lineChartLabels for an invalid period', () => {
    component.fromPeriod = new Date(2022, 0, 1);
    component.toPeriod = new Date(2021, 11, 30);
    component.ngDoCheck();
    expect(component.lineChartLabels.length).toEqual(0);
  });

  it('should not set more than 32 lineChartLabels', () => {
    component.fromPeriod = new Date(2022, 0, 1);
    component.toPeriod = new Date(2022, 1, 1);
    component.ngDoCheck();
    expect(component.lineChartLabels.length).toBeLessThanOrEqual(32);
  });
});
