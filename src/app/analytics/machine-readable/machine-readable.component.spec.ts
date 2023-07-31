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
});
