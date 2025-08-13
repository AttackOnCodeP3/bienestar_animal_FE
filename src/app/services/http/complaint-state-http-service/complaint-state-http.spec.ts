import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

import {ComplaintStateHttpService} from '@services/http';
import { BaseHttpService } from '@services/http/base-http-service/base-http.service';
import { AlertService } from '@services/general';
import { ComplaintStateDTO } from '@models/dto';

describe('ComplaintStateHttpService (Jasmine/Karma, Angular 20)', () => {
  let service: ComplaintStateHttpService;

  const alertServiceMock = {
    displayAlert: () => {},
  } as unknown as AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ComplaintStateHttpService,
        { provide: AlertService, useValue: alertServiceMock },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ComplaintStateHttpService);
  });

  it('getAll() debe delegar en fetchAllPaginated y actualizar signals/meta/paginación', () => {
    const sample: ComplaintStateDTO[] = [
      { id: 1, name: 'OPEN' } as unknown as ComplaintStateDTO,
      { id: 2, name: 'APPROVED' } as unknown as ComplaintStateDTO,
      { id: 3, name: 'CLOSED' } as unknown as ComplaintStateDTO,
    ];

    const fetchSpy = spyOn<any>(service as BaseHttpService<ComplaintStateDTO>, 'fetchAllPaginated')
      .and.callFake((opts: any) => {
        opts.updateSignal.set(sample);
        const meta = { page: 2, size: 50, totalPages: 6 };
        opts.setSearchMeta(meta);
        opts.setTotalItems(meta.totalPages);
      });

    service.getAll();

    expect(fetchSpy).toHaveBeenCalled();
    expect(service.complaintStateList()).toEqual(sample);
    expect(service.search.page).toBe(2);
    expect(service.search.size).toBe(50);
    expect(service.totalItems.length).toBe(6);
    expect(service.totalItems[0]).toBe(1);
    expect(service.totalItems[5]).toBe(6);
  });

  it('getOneById() debe delegar en getOne y retornar el valor', (done) => {
    const item: ComplaintStateDTO = { id: 7, name: 'WITH_OBSERVATIONS' } as unknown as ComplaintStateDTO;

    const getOneSpy = spyOn<any>(service as any, 'getOne').and.returnValue(of(item));

    service.getOneById(7).subscribe((res: ComplaintStateDTO) => {
      expect(getOneSpy).toHaveBeenCalledWith(7);
      expect(res).toEqual(item);
      done();
    });
  });
});
