import { TestBed } from '@angular/core/testing';

import { SanitaryControlResponseHttpService } from './sanitary-control-response-http.service';

describe('SanitaryControlResponseHttp', () => {
  let service: SanitaryControlResponseHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanitaryControlResponseHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
