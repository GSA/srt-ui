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
});
