import { TestBed, inject } from '@angular/core/testing';

import { AgencyService } from './agency.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgencyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgencyService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should provide', inject([AgencyService], (service: AgencyService) => {
    expect(service).toBeTruthy();
  }));
});
