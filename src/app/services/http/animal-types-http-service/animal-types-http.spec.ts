import { TestBed } from '@angular/core/testing';

import { AnimalTypesHttpService } from './animal-types-http.service';

describe('AnimalTypesHttp', () => {
  let service: AnimalTypesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalTypesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
