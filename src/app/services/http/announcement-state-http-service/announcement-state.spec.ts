import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BaseHttpService } from '@services/http/base-http-service/base-http.service';
import { AlertService } from '@services/general';
import { AnnouncementState } from '@models';
import {AnnouncementStateHttpService} from '@services/http';

describe('AnnouncementStateHttpService (Jasmine/Karma, Angular 20)', () => {
  let service: AnnouncementStateHttpService;
  let httpMock: HttpTestingController;

  const alertServiceMock = {
    displayAlert: () => {},
  } as unknown as AlertService;

  function okResponse<T>(data: T, meta: any = { page: 1, size: 20, totalPages: 1 }) {
    return { message: 'ok', data, meta };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnnouncementStateHttpService,
        { provide: AlertService, useValue: alertServiceMock },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AnnouncementStateHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getAll() delega en fetchAllPaginated y actualiza signals/meta/paginación', () => {
    const sample: AnnouncementState[] = [
      { id: 1, name: 'DRAFT' } as unknown as AnnouncementState,
      { id: 2, name: 'PUBLISHED' } as unknown as AnnouncementState,
    ];

    const fetchSpy = spyOn<any>(service as BaseHttpService<AnnouncementState>, 'fetchAllPaginated')
      .and.callFake((opts: any) => {
        opts.updateSignal.set(sample);
        const meta = { page: 3, size: 20, totalPages: 5 };
        opts.setSearchMeta(meta);
        opts.setTotalItems(meta.totalPages);
      });

    service.getAll();

    expect(fetchSpy).toHaveBeenCalled();
    expect(service.announcementStatesList()).toEqual(sample);
    expect(service.search.page).toBe(3);
    expect(service.search.size).toBe(20);
    expect(service.totalItems.length).toBe(5);
    expect(service.isStatesEmpty()).toBeFalse();
    expect(service.isStatesLoading()).toBeFalse();
  });

  it('getById() hace GET /{id}, setea selectedState y ejecuta callback', () => {
    const item: AnnouncementState = { id: 10, name: 'ARCHIVED' } as unknown as AnnouncementState;
    const cb = jasmine.createSpy('callback');

    service.getById(10, cb);

    const req = httpMock.expectOne(`${(service as any).sourceUrl}/10`);
    expect(req.request.method).toBe('GET');

    req.flush(okResponse(item));

    expect(service.selectedState()).toEqual(item);
    expect(cb).toHaveBeenCalled();
  });

  it('getById() (error) delega en handleError', () => {
    const handleErrorSpy = spyOn<any>(service as any, 'handleError')
      .and.returnValue(() => {});

    service.getById(999);

    const req = httpMock.expectOne(`${(service as any).sourceUrl}/999`);
    expect(req.request.method).toBe('GET');

    req.flush({ message: 'not found' }, { status: 404, statusText: 'Not Found' });

    expect(handleErrorSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        message: 'Ocurrió un error al obtener el estado del anuncio.',
        context: jasmine.stringMatching(/#getById$/),
      })
    );
  });
});
