import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedComponent } from './approved.component';

describe('ApprovedComponent', () => {
  let component: ApprovedComponent;
  let fixture: ComponentFixture<ApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
