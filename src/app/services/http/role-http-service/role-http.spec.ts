import { TestBed } from '@angular/core/testing';

import { RoleHttpService } from '@services/http';

describe('RoleHttp', () => {
  let service: RoleHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
