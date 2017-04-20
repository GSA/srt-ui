import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationReportAgComponent } from './solicitation-report-ag.component';

describe('SolicitationReportAgComponent', () => {
  let component: SolicitationReportAgComponent;
  let fixture: ComponentFixture<SolicitationReportAgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitationReportAgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationReportAgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
