import { TestBed } from '@angular/core/testing';

import { ComplaintStateHttpService } from './complaint-state-http.service';

describe('ComplaintStateHttp', () => {
  let service: ComplaintStateHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplaintStateHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
