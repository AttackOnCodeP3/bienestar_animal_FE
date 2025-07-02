import { TestBed } from '@angular/core/testing';

import { NeighborhoodHttpService } from './neighborhood-http.service';

describe('NeighborhoodHttp', () => {
  let service: NeighborhoodHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeighborhoodHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
