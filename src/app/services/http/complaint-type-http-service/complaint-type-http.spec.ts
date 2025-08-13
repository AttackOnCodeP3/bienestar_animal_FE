import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { BaseHttpService } from '@services/http/base-http-service/base-http.service';
import { AlertService } from '@services/general';
import { ComplaintType } from '@models';
import {ComplaintTypeHttpService} from '@services/http';

describe('ComplaintTypeHttpService (Jasmine/Karma, Angular 20)', () => {
  let service: ComplaintTypeHttpService;

  const alertServiceMock = {
    displayAlert: () => {},
  } as unknown as AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ComplaintTypeHttpService,
        { provide: AlertService, useValue: alertServiceMock },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ComplaintTypeHttpService);
  });

  it('getAll() debe delegar en fetchAllPaginated y actualizar signals/meta/paginación', () => {
    const sample: ComplaintType[] = [
      { id: 1, name: 'Ruido' } as unknown as ComplaintType,
      { id: 2, name: 'Basura' } as unknown as ComplaintType,
      { id: 3, name: 'Obstrucción' } as unknown as ComplaintType,
    ];

    const fetchSpy = spyOn<any>(service as BaseHttpService<ComplaintType>, 'fetchAllPaginated')
      .and.callFake((opts: any) => {
        opts.updateSignal.set(sample);
        const meta = { page: 2, size: 50, totalPages: 4 };
        opts.setSearchMeta(meta);
        opts.setTotalItems(meta.totalPages);
      });

    service.getAll();

    expect(fetchSpy).toHaveBeenCalled();
    expect(service.complaintTypeList()).toEqual(sample);
    expect(service.search.page).toBe(2);
    expect(service.search.size).toBe(50);
    expect(service.totalItems.length).toBe(4);
    expect(service.totalItems[0]).toBe(1);
    expect(service.totalItems[3]).toBe(4);
  });

  it('getOneById() debe delegar en getOne y retornar el valor', (done) => {
    const item: ComplaintType = { id: 9, name: 'Maltrato animal' } as unknown as ComplaintType;

    const getOneSpy = spyOn<any>(service as any, 'getOne').and.returnValue(of(item));

    service.getOneById(9).subscribe((res: ComplaintType) => {
      expect(getOneSpy).toHaveBeenCalledWith(9);
      expect(res).toEqual(item);
      done();
    });
  });
});
