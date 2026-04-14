import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpUsImproveComponent } from './help-us-improve.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {SolicitationService} from '../../solicitation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SummaryComponent } from '../summary.component';
import { SurveyService } from 'app/survey.service';

import { Solicitation } from 'app/shared/solicitation';
import {of} from 'rxjs';

describe('HelpUsImproveComponent', () => {
  let component: HelpUsImproveComponent;
  let fixture: ComponentFixture<HelpUsImproveComponent>;
  let solicitationService: SolicitationService;
  let surveyService: SurveyService;

  beforeAll(() => {
    let store = {
      'firstName': 'Test',
      'lastName': 'User',
      'userRole': 'customer test'
    } as any;
  
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        for (var member in store) delete store[member];
      }};
  
      spyOn(window.localStorage, 'getItem')
        .and.callFake(mockLocalStorage.getItem);
      spyOn(Storage.prototype, 'setItem')
        .and.callFake(mockLocalStorage.setItem);
      spyOn(Storage.prototype, 'removeItem')
        .and.callFake(mockLocalStorage.removeItem);
      spyOn(Storage.prototype, 'clear')
        .and.callFake(mockLocalStorage.clear);

  
    });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryComponent, HelpUsImproveComponent ],
      providers: [SurveyService, SolicitationService],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpUsImproveComponent);
    component = fixture.componentInstance;
    solicitationService = TestBed.inject(SolicitationService);
    surveyService = TestBed.inject(SurveyService);
    fixture.detectChanges();

    component.surveyModel = [];


    /* Mock for Survey Service*/
    spyOn(surveyService, 'getSurveys').and.returnValue(of([
      { ID: '0', Type: 'choose one' },
      { ID: '1', Type: 'essay' },
      { ID: '2', Type: 'multiple response' },
    ]));

    
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

  it('should set the feedback true based on history', () => {
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
        { date: '01/01/2022', action: 'provided feedback on the solicitation prediction result', user: 'Test User', status: 'Test Status' }
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
    expect(component.feedbackSent).toBeTrue();
  });

  it('should set the survey answer and survey model for single response survey', () => {
    const mockSurvey = { ID: '1', Type: 'single response', Answer: '' };
    const mockAnswer = 'Test Answer';
    const mockChecked = true;
    component.checkBox(mockSurvey, mockAnswer, mockChecked);
    expect(mockSurvey.Answer).toEqual(mockAnswer);
    expect(component.surveyModel[mockSurvey.ID]).toEqual(mockAnswer);
  });

  it('should append the survey answer and survey model for multiple response survey', () => {
    const mockSurvey = { ID: '1', Type: 'multiple response', Answer: '' };
    const mockAnswer = 'Test Answer';
    const mockChecked = true;
    component.checkBox(mockSurvey, mockAnswer, mockChecked);
    expect(mockSurvey.Answer).toEqual(mockAnswer);
    expect(component.surveyModel[mockSurvey.ID]).toEqual(mockAnswer);
    const mockAnswer2 = 'Test Answer 2';
    component.checkBox(mockSurvey, mockAnswer2, mockChecked);
    expect(mockSurvey.Answer).toEqual(mockAnswer + ',' + mockAnswer2);
    expect(component.surveyModel[mockSurvey.ID]).toEqual(mockAnswer + ',' + mockAnswer2);
  });

  it('should not set the survey answer and survey model for unchecked checkbox', () => {
    const mockSurvey = { ID: '1', Type: 'single response', Answer: '' };
    const mockAnswer = 'Test Answer';
    const mockChecked = false;
    component.checkBox(mockSurvey, mockAnswer, mockChecked);
    expect(mockSurvey.Answer).toEqual('');
    expect(component.surveyModel[mockSurvey.ID]).toBeUndefined();
  });


  it('should set surveys and survey model', () => {
    const mockSolNum = '123';

    const mockGetSurveyResults: any = {
      responses:[
      ]
    }
    spyOn(surveyService, 'getSurveyResults').and.returnValue(of(mockGetSurveyResults));

    component.getSurveys(mockSolNum);
    expect(surveyService.getSurveys).toHaveBeenCalled();
    expect(component.surveys).toEqual([
      { ID: '0', Type: 'choose one' },
      { ID: '1', Type: 'essay' },
      { ID: '2', Type: 'multiple response' },
    ]);


    expect(component.surveyModel).toEqual(['', '', '']);
  });

  it('should set previous answers for checkbox and textarea', () => {
    const mockSolNum = '123';

    const mockGetSurveyResults: any = {
      responses:[
        { questionID: '0', answer: 'Test Answer' },
        { questionID: '1', answer: 'Test Answer 2' },
        { questionID: '2', answer: 'Test Answer 3' },
      ]
    }

    spyOn(surveyService, 'getSurveyResults').and.returnValue(of(mockGetSurveyResults)
    );

    component.getSurveys(mockSolNum);
    expect(surveyService.getSurveys).toHaveBeenCalled();

    expect(surveyService.getSurveyResults).toHaveBeenCalledWith(mockSolNum);
    expect(component.previousAnswers).toEqual({
      responses: [
        { questionID: '0', answer: 'Test Answer' },
        { questionID: '1', answer: 'Test Answer 2' },
        { questionID: '2', answer: 'Test Answer 3' },
      ]
    });

    expect(component.surveyModel).toEqual(['Test Answer', 'Test Answer 2', '']);
  });

});
