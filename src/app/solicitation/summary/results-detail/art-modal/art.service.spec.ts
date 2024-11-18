import { TestBed } from '@angular/core/testing';

import { ArtService } from './art.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ArtService', () => {
  let service: ArtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [ArtService]
    });
    service = TestBed.inject(ArtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
