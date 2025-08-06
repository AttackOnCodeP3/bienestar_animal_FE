import { TestBed } from '@angular/core/testing';

import { ComplaintHttpService } from './complaint-http.service';

describe('ComplaintHttp', () => {
  let service: ComplaintHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplaintHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
