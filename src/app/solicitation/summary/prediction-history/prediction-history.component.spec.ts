import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionHistoryComponent } from './prediction-history.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {SolicitationService} from '../../solicitation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SummaryComponent } from '../summary.component';

describe('PredictionHistoryComponent', () => {
  let component: PredictionHistoryComponent;
  let fixture: ComponentFixture<PredictionHistoryComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
