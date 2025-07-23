import { TestBed } from '@angular/core/testing';

import { CommunityAnimalRegistrationFormService } from './community-animal-registration-form.service';

describe('CommunityAnimalRegistrationForm', () => {
  let service: CommunityAnimalRegistrationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityAnimalRegistrationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
