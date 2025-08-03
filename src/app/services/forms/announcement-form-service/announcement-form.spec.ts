import { TestBed } from '@angular/core/testing';

import { AnnouncementFormService } from './announcement-form.service';

describe('AnnouncementForm', () => {
  let service: AnnouncementFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnouncementFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
