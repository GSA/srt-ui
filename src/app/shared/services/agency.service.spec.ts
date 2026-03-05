import { TestBed, inject } from '@angular/core/testing';

import { AgencyService } from './agency.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AgencyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [AgencyService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it('should provide', inject([AgencyService], (service: AgencyService) => {
    expect(service).toBeTruthy();
  }));
});
