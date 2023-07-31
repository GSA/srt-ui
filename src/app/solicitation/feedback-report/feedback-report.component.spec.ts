import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackReportComponent } from './feedback-report.component';
import {SolicitationService} from '../solicitation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FeedbackReportComponent', () => {
  let component: FeedbackReportComponent;
  let fixture: ComponentFixture<FeedbackReportComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackReportComponent ],
      imports: [HttpClientTestingModule],
      providers: [SolicitationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
