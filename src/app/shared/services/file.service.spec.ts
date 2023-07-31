import { TestBed, inject } from '@angular/core/testing';

import { FileService } from './file.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([FileService], (service: FileService) => {
    expect(service).toBeTruthy();
  }));
});
