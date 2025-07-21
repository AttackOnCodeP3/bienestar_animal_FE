import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Constants } from '@common/constants/constants';
import { Model3DCreateHttpService } from '@services/http';

describe('Model3DCreateHttpService', () => {
  let service: Model3DCreateHttpService;
  let httpMock: HttpTestingController;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  beforeEach(() => {
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['displayAlert']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Model3DCreateHttpService,
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    });
    service = TestBed.inject(Model3DCreateHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});