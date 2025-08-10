import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';


import { BaseHttpService } from '@services/http/base-http-service/base-http.service';
import { AlertService } from '@services/general';
import { IResponse } from '@common/interfaces/http';
import { Canton, District } from '@models';
import {CantonHttpService} from '@services/http';

describe('CantonHttpService (GETs, Jasmine/Karma, Angular 20)', () => {
  let service: CantonHttpService;
  let httpMock: HttpTestingController;

  const alertServiceMock = {
    displayAlert: () => {},
  } as unknown as AlertService;

  function okResponse<T>(
    data: T,
    meta: any = { page: 1, size: 10, totalPages: 1 }
  ): IResponse<T> {
    return { message: 'ok', data, meta };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CantonHttpService,
        { provide: AlertService, useValue: alertServiceMock },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(CantonHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getAll() debe delegar en fetchAllPaginated y actualizar signals, meta y paginación', () => {
    const sampleCantons: Canton[] = [
      { id: 1, name: 'C1' } as unknown as Canton,
      { id: 2, name: 'C2' } as unknown as Canton,
    ];

    const fetchSpy = spyOn<any>(service as BaseHttpService<Canton>, 'fetchAllPaginated')
      .and.callFake((opts: any) => {
        opts.updateSignal.set(sampleCantons);
        const meta = { page: 2, size: 10, totalPages: 5 };
        opts.setSearchMeta(meta);
        opts.setTotalItems(meta.totalPages);
      });

    service.getAll();

    expect(fetchSpy).toHaveBeenCalled();
    expect(service.cantonList()).toEqual(sampleCantons);
    expect(service.search.page).toBe(2);
    expect(service.search.size).toBe(10);
    expect(service.totalItems.length).toBe(5);
    expect(service.totalItems[0]).toBe(1);
    expect(service.totalItems[4]).toBe(5);
  });

  it('getDistrictsByCantonId() debe hacer GET /{id}/districts y setear districtsByCanton', () => {
    const districts: District[] = [
      { id: 10, name: 'D1' } as unknown as District,
      { id: 11, name: 'D2' } as unknown as District,
    ];

    service.getDistrictsByCantonId(7);

    const req = httpMock.expectOne(
      `${(service as any).sourceUrl}/7/districts`
    );
    expect(req.request.method).toBe('GET');

    req.flush(okResponse(districts));

    expect(service.districtsByCanton()).toEqual(districts);
  });

  it('getDistrictsByCantonId() (error) debe delegar en handleError', () => {
    const handleErrorSpy = spyOn<any>(service as any, 'handleError')
      .and.returnValue(() => { });

    service.getDistrictsByCantonId(123);

    const req = httpMock.expectOne(
      `${(service as any).sourceUrl}/123/districts`
    );
    expect(req.request.method).toBe('GET');

    req.flush({ message: 'boom' }, { status: 500, statusText: 'Server Error' });

    expect(handleErrorSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        message: 'Error loading districts for canton',
        context: jasmine.stringMatching(/#getDistrictsByCantonId$/),
      })
    );
  });
});
