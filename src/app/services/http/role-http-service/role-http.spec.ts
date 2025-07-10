import { TestBed } from '@angular/core/testing';

import { RoleHttpService } from './role-http.service';

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
