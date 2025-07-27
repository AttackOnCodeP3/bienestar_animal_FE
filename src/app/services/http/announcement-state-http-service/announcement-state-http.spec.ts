import { TestBed } from '@angular/core/testing';

import { AnnouncementStateHttpService } from './announcement-state-http.service';

describe('AnnouncementStateHttp', () => {
  let service: AnnouncementStateHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnouncementStateHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
