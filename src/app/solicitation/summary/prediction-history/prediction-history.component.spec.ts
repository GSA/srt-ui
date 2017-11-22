import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionHistoryComponent } from './prediction-history.component';

describe('PredictionHistoryComponent', () => {
  let component: PredictionHistoryComponent;
  let fixture: ComponentFixture<PredictionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
