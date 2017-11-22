import { TestBed, inject } from '@angular/core/testing';

import { AgencyService } from './agency.service';

describe('AgencyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgencyService]
    });
  });

  it('should ...', inject([AgencyService], (service: AgencyService) => {
    expect(service).toBeTruthy();
  }));
});
