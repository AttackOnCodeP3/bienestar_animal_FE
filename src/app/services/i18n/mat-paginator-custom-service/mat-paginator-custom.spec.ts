import { TestBed } from '@angular/core/testing';

import { MatPaginatorCustomService } from './mat-paginator-custom.service';

describe('I18nAngularMaterialComponents', () => {
  let service: MatPaginatorCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatPaginatorCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
