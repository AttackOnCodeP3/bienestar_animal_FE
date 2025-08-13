import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { BaseHttpService } from '@services/http/base-http-service/base-http.service';
import { AlertService } from '@services/general';
import { AnimalType } from '@models';
import {AnimalTypesHttpService} from '@services/http';

describe('AnimalTypesHttpService (Jasmine/Karma, Angular 20)', () => {
  let service: AnimalTypesHttpService;

  const alertServiceMock = {
    displayAlert: () => {},
  } as unknown as AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnimalTypesHttpService,
        { provide: AlertService, useValue: alertServiceMock },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AnimalTypesHttpService);
  });

  it('getAll() debe delegar en fetchAllPaginated y actualizar signals/meta/paginación', () => {
    const sample: AnimalType[] = [
      { id: 1, name: 'Perro' } as unknown as AnimalType,
      { id: 2, name: 'Gato' } as unknown as AnimalType,
    ];

    const fetchSpy = spyOn<any>(service as BaseHttpService<AnimalType>, 'fetchAllPaginated')
      .and.callFake((opts: any) => {
        opts.updateSignal.set(sample);
        const meta = { page: 2, size: 10, totalPages: 4 };
        opts.setSearchMeta(meta);
        opts.setTotalItems(meta.totalPages);
      });

    service.getAll();

    expect(fetchSpy).toHaveBeenCalled();
    expect(service.animalTypesList()).toEqual(sample);
    expect(service.search.page).toBe(2);
    expect(service.search.size).toBe(10);
    expect(service.totalItems.length).toBe(4);
    expect(service.totalItems[0]).toBe(1);
    expect(service.totalItems[3]).toBe(4);
  });

  it('getOneById() debe delegar en getOne y retornar el valor', (done) => {
    const item: AnimalType = { id: 7, name: 'Ave' } as unknown as AnimalType;

    const getOneSpy = spyOn<any>(service as any, 'getOne').and.returnValue(of(item));

    service.getOneById(7).subscribe((res: AnimalType) => {
      expect(getOneSpy).toHaveBeenCalledWith(7);
      expect(res).toEqual(item);
      done();
    });
  });
});
