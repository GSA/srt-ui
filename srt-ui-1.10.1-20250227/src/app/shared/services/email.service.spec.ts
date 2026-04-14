import { TestBed, inject } from '@angular/core/testing';

import { EmailService } from './email.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([EmailService], (service: EmailService) => {
    expect(service).toBeTruthy();
  }));
});
