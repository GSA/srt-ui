import { TestBed, inject } from '@angular/core/testing';

import { FileService } from './file.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [FileService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it('should ...', inject([FileService], (service: FileService) => {
    expect(service).toBeTruthy();
  }));
});
