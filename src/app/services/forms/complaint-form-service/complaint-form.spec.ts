import { TestBed } from '@angular/core/testing';

import { ComplaintFormService } from './complaint-form.service';

describe('ComplaintForm', () => {
  let service: ComplaintFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplaintFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
