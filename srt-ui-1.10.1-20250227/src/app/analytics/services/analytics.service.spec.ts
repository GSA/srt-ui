import { TestBed, inject } from '@angular/core/testing';

import { AnalyticsService } from './analytics.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AnalyticsService', () => {

  let service: AnalyticsService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [AnalyticsService]
    }).compileComponents();

    service = TestBed.inject(AnalyticsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
