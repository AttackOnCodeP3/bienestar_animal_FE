import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { AnnouncementHttpService } from '@services/http';
import {Announcement, AnnouncementState} from '@models';

import { AlertService } from '@services/general';
import { AlertTypeEnum } from '@common/enums';
import { IResponse } from '@common/interfaces/http';

// --- Mock AlertService ---
const alertServiceMock = {
  displayAlert: jasmine.createSpy('displayAlert'),
};

// helper de respuesta
function okResponse<T>(data: T, message = 'ok', meta: any = { page: 1, size: 10, totalPages: 1 }): IResponse<T> {
  return { message, data, meta };
}

describe('AnnouncementHttpService (Angular 20)', () => {
  let service: AnnouncementHttpService;
  let httpMock: HttpTestingController;

  const baseUrl = '/announcements';

  // Instancias reales de tus clases de modelo
  const state = new AnnouncementState({
    id: 1,
    name: 'Publicado',
    description: 'visible',
  });

  const announcement = new Announcement({
    id: 123,
    title: 'Evento',
    description: '<p>Desc</p>',
    // simulamos backend: strings ISO
    startDate: '2025-08-09',
    endDate: '2025-08-10',
    imageUrl: 'https://i.imgur.com/3MQCUBZ.jpeg',
    state,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AlertService, useValue: alertServiceMock },
        AnnouncementHttpService,
      ],
    });

    service = TestBed.inject(AnnouncementHttpService);
    httpMock = TestBed.inject(HttpTestingController);

    // asegurar el base de endpoints esperado
    (service as any).sourceUrl = baseUrl;

    alertServiceMock.displayAlert.calls.reset();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // GET /my-municipality/filter
  it('getAllAnnouncementsByMunicipality -> solicita lista filtrada y actualiza signals', () => {
    service.getAllAnnouncementsByMunicipality({ title: 'ev', stateId: 1 }, { page: 2 });

    const req = httpMock.expectOne(r =>
      r.method === 'GET' &&
      r.url === `${baseUrl}/my-municipality/filter` &&
      r.params.get('page') === '2' &&
      r.params.get('size') === '10' &&
      r.params.get('title') === 'ev' &&
      r.params.get('stateId') === '1'
    );
    expect(req.request.method).toBe('GET');

    const list = [announcement];
    req.flush(okResponse(list, 'ok', { page: 2, size: 10, totalPages: 3 }));

    expect(service['announcementList']()).toEqual(list);
    expect(service['hasSearched']()).toBeTrue();
    expect(service['search'].page).toBe(2);
    expect(service['totalItems'].length).toBe(3);
  });

  // GET /my-municipality/:id
  it('getMyMunicipalityAnnouncementById -> trae un anuncio y setea selectedAnnouncement', () => {
    const id = 123;
    service.getMyMunicipalityAnnouncementById(id);

    const req = httpMock.expectOne(`${baseUrl}/my-municipality/${id}`);
    expect(req.request.method).toBe('GET');

    req.flush(okResponse(announcement));

    expect(service['selectedAnnouncement']()).toEqual(announcement);
  });

  // POST /my-municipality (multipart)
  it('createAnnouncement -> postea FormData y muestra alerta de éxito', () => {
    const formData = new FormData();
    const dto: any = { toFormData: () => formData };

    service.createAnnouncement(dto);

    const req = httpMock.expectOne(`${baseUrl}/my-municipality`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTrue();

    req.flush(okResponse(announcement, 'creado ok'));

    expect(service['selectedAnnouncement']()).toEqual(announcement);
    expect(alertServiceMock.displayAlert).toHaveBeenCalledWith({
      type: AlertTypeEnum.SUCCESS,
      message: 'creado ok',
    });
  });

  // PUT /my-municipality/:id (multipart)
  it('updateAnnouncement -> envía FormData por PUT y actualiza selectedAnnouncement', () => {
    const id = 999;
    const formData = new FormData();
    const dto: any = { toFormData: () => formData };

    service.updateAnnouncement(id, dto);

    const req = httpMock.expectOne(`${baseUrl}/my-municipality/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body instanceof FormData).toBeTrue();

    req.flush(okResponse(announcement, 'actualizado ok'));

    expect(service['selectedAnnouncement']()).toEqual(announcement);
    expect(alertServiceMock.displayAlert).toHaveBeenCalledWith({
      type: AlertTypeEnum.SUCCESS,
      message: 'actualizado ok',
    });
  });

  // GET /my-municipality/visible
  it('getVisibleAnnouncementsByMunicipality -> solicita visibles y pobla announcementList', () => {
    service.getVisibleAnnouncementsByMunicipality({ page: 1 });

    const req = httpMock.expectOne(r =>
      r.method === 'GET' &&
      r.url === `${baseUrl}/my-municipality/visible` &&
      r.params.get('page') === '1' &&
      r.params.get('size') === '10'
    );
    expect(req.request.method).toBe('GET');

    const list = [
      announcement,
      new Announcement({ ...announcement, id: 124 }),
    ];
    req.flush(okResponse(list, 'ok', { page: 1, size: 10, totalPages: 2 }));

    expect(service['announcementList']().length).toBe(2);
    expect(service['hasSearched']()).toBeTrue();
    expect(service['search'].page).toBe(1);
    expect(service['totalItems'].length).toBe(2);
  });

  // GET /my-municipality/visible/:id
  it('getVisibleAnnouncementById -> trae anuncio visible por id y setea selectedAnnouncement', () => {
    const id = 123;
    service.getVisibleAnnouncementById(id);

    const req = httpMock.expectOne(`${baseUrl}/my-municipality/visible/${id}`);
    expect(req.request.method).toBe('GET');

    req.flush(okResponse(announcement));

    expect(service['selectedAnnouncement']()).toEqual(announcement);
  });

  // Loading flag vía finalize
  it('maneja isLoading on/off con finalize en GET visibles', () => {
    expect(service['isLoading']()).toBeFalse();

    service.getVisibleAnnouncementsByMunicipality();

    expect(service['isLoading']()).toBeTrue();

    const req = httpMock.expectOne(`${baseUrl}/my-municipality/visible`);
    req.flush(okResponse<Announcement[]>([], 'ok', { page: 1, size: 10, totalPages: 0 }));

    expect(service['isLoading']()).toBeFalse();
  });
});
