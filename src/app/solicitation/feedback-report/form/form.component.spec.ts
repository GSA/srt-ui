import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { SolicitationService } from '../../solicitation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let solicitationService: SolicitationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      providers: [SolicitationService],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    solicitationService = TestBed.inject(SolicitationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign feedback', () => {
    const mockFeedback = {
      email: 'user@example.com',
      date: '2021-01-01',
      responses: [
        { question: 'Question 1', answer: 'Answer 1' },
        { question: 'Question 2', answer: 'Answer 2' }
      ],
      solNum: '123'
    };
    
    component.assignFeedback(mockFeedback);
    expect(component.submitter).toEqual('user@example.com');
    expect(component.date).toEqual('2021-01-01');
    expect(component.feedback).toEqual([
      { question: 'Question 1', answer: 'Answer 1' },
      { question: 'Question 2', answer: 'Answer 2' }
    ]);
    expect(component.title).toEqual('123');
    expect(component.solNum).toEqual('123');
  });
});
