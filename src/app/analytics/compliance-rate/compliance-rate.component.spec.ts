import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceRateComponent } from './compliance-rate.component';

describe('ComplianceRateComponent', () => {
  let component: ComplianceRateComponent;
  let fixture: ComponentFixture<ComplianceRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
