import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmailPocComponent } from './email-poc.component';
import {SolicitationService} from '../../solicitation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SummaryComponent } from '../summary.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { QuillEditorModule } from 'ngx-quill-editor';


describe('EmailPocComponent', () => {
  let component: EmailPocComponent;
  let fixture: ComponentFixture<EmailPocComponent>;

  beforeAll(() => {
    let store = {
      'emai': 'test1@testing.com',
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailPocComponent, SummaryComponent],
      providers: [SolicitationService],
      imports: [QuillEditorModule, ReactiveFormsModule, 
        HttpClientTestingModule, RouterTestingModule.withRoutes([]),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    /*
    const dummyData = {
      emailTo: 'test@example.com',
      emailCC: 'test1@example.com,test2@example.com',
      subject: 'Test email',
      epaSubject: 'Test EPA email',
      it_message: 'This is a test email message.',
      epa_message: 'This is a test EPA email message.'
    };
  
    component.myForm = new FormGroup({
      emailTo: new FormControl(dummyData.emailTo, Validators.required),
      emailCC: new FormControl(dummyData.emailCC, Validators.required),
      subject: new FormControl(dummyData.subject, Validators.required),
      epaSubject: new FormControl(dummyData.epaSubject, Validators.required),
      it_message: new FormControl(dummyData.it_message, Validators.required),
      epa_message: new FormControl(dummyData.epa_message, Validators.required)
    });
    */

  });

  xit('should create', () => {
    localStorage.setItem('email', 'test@test.com');
    expect(component).toBeTruthy();
  });
});
