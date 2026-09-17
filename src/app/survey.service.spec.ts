import { TestBed, inject } from '@angular/core/testing';

import { SurveyService } from './survey.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SurveyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [SurveyService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it('should ...', inject([SurveyService], (service: SurveyService) => {
    expect(service).toBeTruthy();
  }));
});
