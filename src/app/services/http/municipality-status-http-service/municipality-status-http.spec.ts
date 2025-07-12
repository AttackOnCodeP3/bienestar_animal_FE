import { TestBed } from '@angular/core/testing';

import { MunicipalityStatusHttpService } from './municipality-status-http.service';

describe('MunicipalityStatusHttp', () => {
  let service: MunicipalityStatusHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MunicipalityStatusHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
