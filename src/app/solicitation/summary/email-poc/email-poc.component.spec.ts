import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPocComponent } from './email-poc.component';

describe('EmailPocComponent', () => {
  let component: EmailPocComponent;
  let fixture: ComponentFixture<EmailPocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailPocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
