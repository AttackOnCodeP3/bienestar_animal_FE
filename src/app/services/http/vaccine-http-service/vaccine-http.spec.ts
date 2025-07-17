import { TestBed } from '@angular/core/testing';

import { VaccineHttpService } from './vaccine-http.service';

describe('VaccineHttp', () => {
  let service: VaccineHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
