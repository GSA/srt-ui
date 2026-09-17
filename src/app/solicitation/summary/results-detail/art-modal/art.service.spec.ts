import { TestBed } from '@angular/core/testing';

import { ArtService } from './art.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArtService', () => {
  let service: ArtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [],
    imports: [],
    providers: [ArtService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ArtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
