import { TestBed } from '@angular/core/testing';

import { CommunityAnimalHttpService } from './community-animal-http.service';

describe('CommunityAnimalHttp', () => {
  let service: CommunityAnimalHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityAnimalHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
