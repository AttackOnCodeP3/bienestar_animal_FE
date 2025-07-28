import { TestBed } from '@angular/core/testing';

import { AnnouncementHttpService } from './announcement-http.service';

describe('AnnouncementHttp', () => {
  let service: AnnouncementHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnouncementHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
