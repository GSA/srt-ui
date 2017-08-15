import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionResultComponent } from './prediction-result.component';

describe('PredictionResultComponent', () => {
  let component: PredictionResultComponent;
  let fixture: ComponentFixture<PredictionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
