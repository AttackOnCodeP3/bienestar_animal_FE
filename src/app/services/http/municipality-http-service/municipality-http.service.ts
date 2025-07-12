import {Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {ISearch} from '@common/interfaces/http';
import {Constants} from '@common/constants/constants';
import {AlertTypeEnum} from '@common/enums';
import {createPageArray} from '@common/utils';
import {Municipality} from '@models';
import {CreateMunicipalityRequestDTO, UpdateMunicipalityRequestDTO} from '@models/dto';

/**
 * Service for managing municipalities via HTTP requests.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class MunicipalityHttpService extends BaseHttpService<Municipality> {

  protected override source = Constants.MUNICIPALITIES_URL;

  readonly municipalityList = signal<Municipality[]>([]);
  /**
   * Signal to hold a municipality searched by ID.
   * @author dgutierrez
   */
  readonly selectedMunicipalityId = signal<Municipality | null>(null);

  search: ISearch = {
    page: 1,
    size: 10
  };

  totalItems: number[] = [];

  /**
   * Fetches all municipalities with pagination.
   * @author dgutierrez
   * @modifiedby gjimenez 10/7/2025 unknown what changes he made
   */
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

  /**
   * Fetches a single municipality by ID.
   * @author dgutierrez
   */
  getById(id: number) {
    this.find(id).subscribe({
      next: (response) => {
        this.selectedMunicipalityId.set(response.data);
      },
      error: this.handleError({
        message: 'An error occurred fetching the municipality by ID',
        context: `${this.constructor.name}#getById`
      })
    });
  }

  /**
   * Adds a new municipality.
   * @author dgutierrez
   * @modifiedby gjimenez 10/7/2025 unknown what changes he made
   */
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

  /**
   * Updates an existing municipality.
   * @author dgutierrez
   * @modifiedby gjimenez 10/7/2025 unknown what changes he made
   */
  update(municipality: UpdateMunicipalityRequestDTO): void {
    this.edit(municipality.id!, municipality).subscribe({
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

  /**
   * Deletes a municipality by ID.
   * @author dgutierrez
   * @modifiedby gjimenez 10/7/2025 unknown what changes he made
   */
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
