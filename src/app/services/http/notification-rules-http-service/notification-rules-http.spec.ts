import { TestBed } from '@angular/core/testing';

import { NotificationRulesHttpService } from './notification-rules-http.service';

describe('NotificationRulesHttp', () => {
  let service: NotificationRulesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationRulesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
