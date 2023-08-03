import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionHistoryComponent } from './prediction-history.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {SolicitationService} from '../../solicitation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SummaryComponent } from '../summary.component';
import { Solicitation } from 'app/shared/solicitation';
import {of} from 'rxjs';

describe('PredictionHistoryComponent', () => {
  let component: PredictionHistoryComponent;
  let fixture: ComponentFixture<PredictionHistoryComponent>;
  let solicitationService: SolicitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryComponent, PredictionHistoryComponent ],
      providers: [SolicitationService],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionHistoryComponent);
    component = fixture.componentInstance;
    solicitationService = TestBed.inject(SolicitationService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set predictionHistory with formatted dates', () => {
  const mockSolicitation = new Solicitation(
    '123',
    'Test Solicitation',
    'http://example.com',
    { value: 'Test Prediction', history: [
      {value: 'Test History 1', date:'2022-01-01T12:00:00.000Z'},
      {value: 'Test History 2', date:'2022-01-02T12:00:00.000Z'}
    ] },
    'John Doe',
    '1',
    { value: 'Test Category' },
    new Date(),
    'Test Agency',
    'Test Office',
    'Test Contact',
    'Test Position',
    'Test Notice Type',
    [
      {
        formattedDate: '01/01/2022',
        postedDate: new Date(),
        name: 'Test PredictionHistoryComponent',
        status: 'Yes',
        attachment_url: 'http://example.com'
      }
    ],
    ['Test Contact Info'],
    [
      {
        date: '2022-01-01T00:00:00.000Z',
        action: 'Test Action 1',
        user: 'Test User 1',
        status: 'Test Status 1'
      },
      {
        date: '2022-01-02T00:00:00.000Z',
        action: 'Test Action 2',
        user: 'Test User 2',
        status: 'Test Status 2'
      }
    ],
    [
      {
        questionID: '1',
        question: 'Test Question 1',
        note: 'Test Note 1',
        answer: 'Test Answer 1'
      }
    ],
    {
      psc: 'Test PSC',
      naics: 'Test NAICS',
      naics_match: true,
      epa_psc_match: true
    },
    false,
    false,
    false,
    '123',
    true
  );


  spyOn(solicitationService, 'getSolicitation').and.returnValue(of(mockSolicitation));

  component.ngOnInit();

  expect(component.predictionHistory).toEqual([
    {
      date: '01/02/2022',
      value: 'Test History 2'
    },
    {
      date: '01/01/2022',
      value: 'Test History 1',
    }
  ]);
});
});
