import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsDetailComponent } from './results-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {SolicitationService} from '../../solicitation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SummaryComponent } from '../summary.component';

describe('ResultsDetailComponent', () => {
  let component: ResultsDetailComponent;
  let fixture: ComponentFixture<ResultsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryComponent, ResultsDetailComponent ],
      providers: [SolicitationService],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
