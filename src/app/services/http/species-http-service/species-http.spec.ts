import { TestBed } from '@angular/core/testing';

import { SpeciesHttpService } from './species-http.service';

describe('SpeciesHttp', () => {
  let service: SpeciesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeciesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
