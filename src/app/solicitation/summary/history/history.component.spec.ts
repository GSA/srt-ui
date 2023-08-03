import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {SolicitationService} from '../../solicitation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SummaryComponent } from '../summary.component';

import { Solicitation } from 'app/shared/solicitation';
import {of} from 'rxjs';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let solicitationService: SolicitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryComponent, HistoryComponent ],
      providers: [SolicitationService],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    solicitationService = TestBed.inject(SolicitationService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the solicitation property', () => {
    const mockSolicitation: Solicitation = new Solicitation(
      '123',
      'Test Solicitation',
      'http://example.com',
      { value: 'Test Prediction', history: [{value: '', date:''}] },
      'John Doe',
      '1',
      { value: 'Test Category' },
      new Date(),
      'Test Agency',
      'Test Office',
      'Test Contact',
      'Test Position',
      'Test Notice Type',
      [{
        formattedDate: '',
        postedDate: new Date(),
        name: '',
        status: '',
        attachment_url: ''
      }],
      ['Test Contact Info'],
      [
        { date: '01/01/2022', action: 'Test Action', user: 'Test User', status: 'Test Status' }
      ],
      [
        {questionID: '1', question: 'Test Question', note: 'Test Note', answer: 'Test Answer'}
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
    expect(component.solicitation).toEqual(mockSolicitation);
  });

  it('should set the step1, step2, and step3 properties', () => {
    const mockSolicitation: Solicitation = new Solicitation(
      '123',
      'Test Solicitation',
      'http://example.com',
      { value: 'Test Prediction', 
      history: [{value: 'test', date:'2-2-2222'}] },
      'John Doe',
      '1',
      { value: 'Test Category' },
      new Date(),
      'Test Agency',
      'Test Office',
      'Test Contact',
      'Test Position',
      'Test Notice Type',
      [{
        formattedDate: '',
        postedDate: new Date(),
        name: '',
        status: '',
        attachment_url: ''}
      ],
      ['Test Contact Info'],
      [
        {
          date: '01/01/2022',
          action: 'reviewed solicitation action requested summary',
          user: 'Test User 1',
          status: 'Test Status 1'
        },
        {
          date: '01/02/2022',
          action: 'sent email to POC',
          user: 'Test User 2',
          status: 'Test Status 2'
        },
        {
          date: '01/03/2022',
          action: 'provided feedback on the solicitation prediction result',
          user: 'Test User 3',
          status: 'Test Status 3'
        }
      ],
      [{questionID: '1', question: 'Test Question', note: 'Test Note', answer: 'Test Answer'}],
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
    expect(component.step1).toBeTrue();
    expect(component.step2).toBeTrue();
    expect(component.step3).toBeTrue();
  });

  it('should set the sort history parameter in date order from data.history', () => {
    const mockSolicitation: Solicitation = new Solicitation(
      '123',
      'Test Solicitation',
      'http://example.com',
      { value: 'Test Prediction', 
      history: [{value: 'test', date:'2-2-2222'}] },
      'John Doe',
      '1',
      { value: 'Test Category' },
      new Date(),
      'Test Agency',
      'Test Office',
      'Test Contact',
      'Test Position',
      'Test Notice Type',
      [{
        formattedDate: '',
        postedDate: new Date(),
        name: '',
        status: '',
        attachment_url: ''}
      ],
      ['Test Contact Info'],
      [
        {
          date: '01/02/2022',
          action: 'sent email to POC',
          user: 'Test User 2',
          status: 'Test Status 2'
        },
        {
          date: '01/01/2022',
          action: 'reviewed solicitation action requested summary',
          user: 'Test User 1',
          status: 'Test Status 1'
        },
        {
          date: '01/03/2022',
          action: 'provided feedback on the solicitation prediction result',
          user: 'Test User 3',
          status: 'Test Status 3'
        }
      ],
      [{questionID: '1', question: 'Test Question', note: 'Test Note', answer: 'Test Answer'}],
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
    expect(component.history).toEqual(
      [
        {
          date: '01/01/2022',
          action: 'reviewed solicitation action requested summary',
          user: 'Test User 1',
          status: 'Test Status 1'
        },
        {
          date: '01/02/2022',
          action: 'sent email to POC',
          user: 'Test User 2',
          status: 'Test Status 2'
        },
        {
          date: '01/03/2022',
          action: 'provided feedback on the solicitation prediction result',
          user: 'Test User 3',
          status: 'Test Status 3'
        }
      ]
    )
  });

});
