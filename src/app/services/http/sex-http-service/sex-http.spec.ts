import { TestBed } from '@angular/core/testing';

import { SexHttpService } from './sex-http.service';

describe('SexHttp', () => {
  let service: SexHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SexHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
