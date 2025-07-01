import { TestBed } from '@angular/core/testing';

import { InterestHttpService } from './interest-http.service';

describe('Interest', () => {
  let service: InterestHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
