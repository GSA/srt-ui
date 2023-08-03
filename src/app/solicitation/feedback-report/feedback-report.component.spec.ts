import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackReportComponent } from './feedback-report.component';
import {SolicitationService} from '../solicitation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('FeedbackReportComponent', () => {
  let component: FeedbackReportComponent;
  let fixture: ComponentFixture<FeedbackReportComponent>;
  let solicitationService: SolicitationService

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
    solicitationService = TestBed.inject(SolicitationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get feedback', () => {
    const mockFeedback = [
      {
        id: 1,
        history: [
          { action: 'provided feedback on the solicitation prediction result', user: 'user1', date: '2021-01-01' }
        ]
      },
      {
        id: 2,
        history: [
          { action: 'provided feedback on the solicitation prediction result', user: 'user2', date: '2021-01-02' }
        ]
      }
    ];
    spyOn(solicitationService, 'getSolicitationFeedback').and.returnValue(of(mockFeedback));
    component.getFeedback();
    expect(solicitationService.getSolicitationFeedback).toHaveBeenCalledWith(component.params);
    expect(component.feedback).toEqual([
      { id: 2, submitter: 'user2', date: '2021-01-02', history: [{ action: 'provided feedback on the solicitation prediction result', user: 'user2', date: '2021-01-02' }] },
      { id: 1, submitter: 'user1', date: '2021-01-01', history: [{ action: 'provided feedback on the solicitation prediction result', user: 'user1', date: '2021-01-01' }] }
    ]);
  });
});
