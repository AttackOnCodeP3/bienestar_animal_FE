import { TestBed } from '@angular/core/testing';

import { ErrorHandlingService } from './error-handling.service';

describe('ErrorHandling', () => {
  let service: ErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
