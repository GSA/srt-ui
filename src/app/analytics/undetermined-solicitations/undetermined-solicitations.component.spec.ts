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
});
