import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AnnouncementHttpService } from '@services/http';
import { IResponse } from '@common/interfaces/http';
import { Announcement } from '@models';
import { AlertService } from '@services/general';

describe('AnnouncementHttpService (GETs, Jasmine/Karma, Angular 20)', () => {
  let service: AnnouncementHttpService;
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
        AnnouncementHttpService,
        { provide: AlertService, useValue: alertServiceMock },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AnnouncementHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getAllAnnouncementsByMunicipality() llama /my-municipality/filter con params y actualiza signals', () => {
    const sample: Announcement[] = [
      { id: 1, title: 'A1' } as unknown as Announcement,
      { id: 2, title: 'A2' } as unknown as Announcement,
    ];

    service.getAllAnnouncementsByMunicipality({ title: 'hola', stateId: 3 }, { page: 2 });

    const req = httpMock.expectOne(r =>
      r.method === 'GET' &&
      r.url === `${(service as any).sourceUrl}/my-municipality/filter`
    );

    expect(req.request.params.get('page')).toBe('2');
    expect(req.request.params.get('size')).toBe(String(service.search.size));
    expect(req.request.params.get('title')).toBe('hola');
    expect(req.request.params.get('stateId')).toBe('3');

    req.flush(okResponse(sample, { page: 2, size: 10, totalPages: 4 }));

    expect(service.announcementList()).toEqual(sample);
    expect(service.hasSearchedAnnouncements()).toBeTrue();
    expect(service.isAnnouncementsLoading()).toBeFalse();
    expect(service.totalItems.length).toBe(4);
    expect(service.search.page).toBe(2);
  });

  it('getMyMunicipalityAnnouncementById() llama /my-municipality/{id}, setea selected y ejecuta callbacks', () => {
    const item: Announcement = { id: 7, title: 'Detalle' } as unknown as Announcement;
    const showLoading = jasmine.createSpy('showLoading');
    const hideLoading = jasmine.createSpy('hideLoading');
    const callback   = jasmine.createSpy('callback');

    service.getMyMunicipalityAnnouncementById(7, { showLoading, hideLoading, callback });

    const req = httpMock.expectOne(`${(service as any).sourceUrl}/my-municipality/7`);
    expect(req.request.method).toBe('GET');

    expect(service.isAnnouncementsLoading()).toBeTrue();
    expect(showLoading).toHaveBeenCalled();

    req.flush(okResponse(item));

    expect(service.selectedAnnouncement()).toEqual(item);
    expect(callback).toHaveBeenCalled();
    expect(hideLoading).toHaveBeenCalled();
    expect(service.isAnnouncementsLoading()).toBeFalse();
  });

  it('getVisibleAnnouncementsByMunicipality() llama /my-municipality/visible y actualiza lista/flags', () => {
    const sample: Announcement[] = [{ id: 11, title: 'Pub1' } as unknown as Announcement];

    service.getVisibleAnnouncementsByMunicipality({ page: 3 });

    const req = httpMock.expectOne(r =>
      r.method === 'GET' &&
      r.url === `${(service as any).sourceUrl}/my-municipality/visible`
    );

    expect(req.request.params.get('page')).toBe('3');
    expect(req.request.params.get('size')).toBe(String(service.search.size));

    req.flush(okResponse(sample, { page: 3, size: 10, totalPages: 3 }));

    expect(service.announcementList()).toEqual(sample);
    expect(service.hasSearchedAnnouncements()).toBeTrue();
    expect(service.isAnnouncementsLoading()).toBeFalse();
    expect(service.search.page).toBe(3);
    expect(service.totalItems.length).toBe(3);
  });

  it('getVisibleAnnouncementById() llama /my-municipality/visible/{id} y setea selected', () => {
    const item: Announcement = { id: 22, title: 'Visible 22' } as unknown as Announcement;
    const cb = jasmine.createSpy('callback');

    service.getVisibleAnnouncementById(22, { callback: cb });

    const req = httpMock.expectOne(`${(service as any).sourceUrl}/my-municipality/visible/22`);
    expect(req.request.method).toBe('GET');

    req.flush(okResponse(item));

    expect(service.selectedAnnouncement()).toEqual(item);
    expect(cb).toHaveBeenCalled();
    expect(service.isAnnouncementsLoading()).toBeFalse();
  });

  it('getVisibleAnnouncementById() (error) delega en handleError y limpia loading', () => {
    const handleErrorSpy = spyOn<any>(service as any, 'handleError')
      .and.returnValue(() => {});

    service.getVisibleAnnouncementById(999);

    const req = httpMock.expectOne(`${(service as any).sourceUrl}/my-municipality/visible/999`);
    req.flush({ message: 'not found' }, { status: 404, statusText: 'Not Found' });

    expect(handleErrorSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        message: 'Error fetching visible announcement by id.',
        context: jasmine.stringMatching(/#getVisibleAnnouncementById$/),
      })
    );
    expect(service.isAnnouncementsLoading()).toBeFalse();
  });
});
