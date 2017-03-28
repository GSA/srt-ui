import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationReportComponent } from './solicitation-report.component';

describe('SolicitationReportComponent', () => {
  let component: SolicitationReportComponent;
  let fixture: ComponentFixture<SolicitationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
