import { TestBed, inject } from '@angular/core/testing';

import { SolicitationService } from './solicitation.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SolicitationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [],
    imports: [],
    providers: [SolicitationService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it('should ...', inject([SolicitationService], (service: SolicitationService) => {
    expect(service).toBeTruthy();
  }));
});
