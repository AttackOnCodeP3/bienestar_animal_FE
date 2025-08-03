import { TestBed } from '@angular/core/testing';

import { ComplaintTypeHttpService } from './complaint-type-http.service';

describe('ComplaintTypeHttp', () => {
  let service: ComplaintTypeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplaintTypeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
