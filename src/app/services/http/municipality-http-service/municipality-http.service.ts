import {Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {ISearch} from '@common/interfaces/http';
import {Constants} from '@common/constants/constants';
import {AlertTypeEnum} from '@common/enums';
import {createPageArray} from '@common/utils';
import {Municipality} from '@models';
import {CreateMunicipalityRequestDTO, UpdateMunicipalityRequestDTO} from '@models/dto';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityHttpService extends BaseHttpService<Municipality> {

  protected override source = '/municipalities';

  readonly municipalityList = signal<Municipality[]>([]);

  search: ISearch = {
    page: 1,
    size: 10
  };

  totalItems: number[] = [];

  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.municipalityList,
      page: this.search.page ?? 1,
      size: this.search.size ?? 10,
      setSearchMeta: (meta) => {
        this.search = { ...this.search, ...meta };
      },
      setTotalItems: (totalPages) => {
        this.totalItems = createPageArray(totalPages);
      },
      context: `${this.constructor.name}#getAll`,
    });
  }

  getById(id: number) {
    return this.getOne(id);
  }

  save(dto: CreateMunicipalityRequestDTO): void {
    this.add(dto).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'Error creating municipality',
        context: `${this.constructor.name}#save`
      })
    });
  }

  update(municipality: UpdateMunicipalityRequestDTO): void {
    if (!municipality.id) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: 'Municipality ID required'
      });
      return;
    }

    this.edit(municipality.id, municipality).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'Error updating municipality',
        context: `${this.constructor.name}#update`
      })
    });
  }

  delete(municipality: Municipality): void {
    this.del(municipality.id).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'Error deleting municipality',
        context: `${this.constructor.name}#delete`
      })
    });
  }
}
