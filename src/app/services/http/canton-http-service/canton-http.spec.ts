import { TestBed } from '@angular/core/testing';

import { CantonHttpService } from './canton-http.service';

describe('CantonHttp', () => {
  let service: CantonHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CantonHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
