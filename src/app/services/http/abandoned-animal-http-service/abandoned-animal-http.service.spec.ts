import { TestBed } from '@angular/core/testing';
import { AbandonedAnimalHttpService } from './abandoned-animal-http.service';

describe('AbandonedAnimalHttpService', () => {
  let service: AbandonedAnimalHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbandonedAnimalHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
