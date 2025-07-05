import { TestBed } from '@angular/core/testing';

import { UserRegistrationFormService } from './user-registration-form.service';

describe('UserRegistrationForm', () => {
  let service: UserRegistrationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistrationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
