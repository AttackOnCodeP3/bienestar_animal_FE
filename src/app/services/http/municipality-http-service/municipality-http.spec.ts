import { TestBed } from '@angular/core/testing';

import { MunicipalityHttpService } from '@services/http';

describe('MunicipalityHttp', () => {
  let service: MunicipalityHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MunicipalityHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
