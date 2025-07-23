import { TestBed } from '@angular/core/testing';

import { SanitaryControlTypeHttpService } from './sanitary-control-type-http.service';

describe('SanitaryControlTypeHttp', () => {
  let service: SanitaryControlTypeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanitaryControlTypeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
