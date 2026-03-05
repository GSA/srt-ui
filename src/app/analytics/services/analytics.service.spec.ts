import { TestBed, inject } from '@angular/core/testing';

import { AnalyticsService } from './analytics.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


describe('AnalyticsService', () => {

  let service: AnalyticsService;


  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [],
    imports: [],
    providers: [AnalyticsService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    service = TestBed.inject(AnalyticsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
