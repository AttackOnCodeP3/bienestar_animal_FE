import { TestBed } from '@angular/core/testing';

import { BaseHttpService } from '@services/http';

describe('BaseHttp', () => {
  let service: BaseHttpService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
