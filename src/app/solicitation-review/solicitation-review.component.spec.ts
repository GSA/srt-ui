import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationReviewComponent } from './solicitation-review.component';

describe('SolicitationReviewComponent', () => {
  let component: SolicitationReviewComponent;
  let fixture: ComponentFixture<SolicitationReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitationReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
