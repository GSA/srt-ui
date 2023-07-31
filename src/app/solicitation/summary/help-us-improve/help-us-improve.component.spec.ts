import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpUsImproveComponent } from './help-us-improve.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {SolicitationService} from '../../solicitation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SummaryComponent } from '../summary.component';
import { SurveyService } from 'app/survey.service';

describe('HelpUsImproveComponent', () => {
  let component: HelpUsImproveComponent;
  let fixture: ComponentFixture<HelpUsImproveComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
