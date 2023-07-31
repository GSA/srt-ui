import { TestBed, inject } from '@angular/core/testing';

import { SurveyService } from './survey.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SurveyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurveyService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([SurveyService], (service: SurveyService) => {
    expect(service).toBeTruthy();
  }));
});
