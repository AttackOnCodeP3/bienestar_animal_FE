import { TestBed } from '@angular/core/testing';

import { DistrictHttpService } from './district-http.service';

describe('DistrictHttp', () => {
  let service: DistrictHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistrictHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
