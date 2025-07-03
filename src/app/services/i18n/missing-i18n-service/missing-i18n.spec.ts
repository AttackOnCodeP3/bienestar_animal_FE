import { TestBed } from '@angular/core/testing';

import { MissingI18nService } from './missing-i18n.service';

describe('MissingI18nService', () => {
  let service: MissingI18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissingI18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
