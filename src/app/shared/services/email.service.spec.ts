import { TestBed, inject } from '@angular/core/testing';

import { EmailService } from './email.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [EmailService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it('should ...', inject([EmailService], (service: EmailService) => {
    expect(service).toBeTruthy();
  }));
});
