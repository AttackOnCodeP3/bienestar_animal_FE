import { TestBed } from '@angular/core/testing';

import { MissingI18n } from './missing-i18n';

describe('MissingI18nService', () => {
  let service: MissingI18n;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissingI18n);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
