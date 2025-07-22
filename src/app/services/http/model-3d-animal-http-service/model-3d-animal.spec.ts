import { TestBed } from '@angular/core/testing';

import { Model3DAnimalHttpService } from './model3d-animal-http.service';

describe('Model3DAnimalHttp', () => {
  let service: Model3DAnimalHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Model3DAnimalHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});