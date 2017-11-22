import { TestBed, inject } from '@angular/core/testing';

import { EmailService } from './email.service';

describe('EmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailService]
    });
  });

  it('should ...', inject([EmailService], (service: EmailService) => {
    expect(service).toBeTruthy();
  }));
});
