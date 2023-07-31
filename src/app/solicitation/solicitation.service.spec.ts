import { TestBed, inject } from '@angular/core/testing';

import { SolicitationService } from './solicitation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolicitationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [SolicitationService]
    });
  });

  it('should ...', inject([SolicitationService], (service: SolicitationService) => {
    expect(service).toBeTruthy();
  }));
});
