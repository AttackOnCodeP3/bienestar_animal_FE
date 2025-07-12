import { Injectable, signal } from '@angular/core';
import { BaseHttpService } from '@services/http';
import { ISearch } from '@common/interfaces/http';
import { Constants } from '@common/constants/constants';
import { Municipality } from '@models';
import { AlertTypeEnum } from '@common/enums';
import { createPageArray } from '@common/utils';

/**
 * Service for managing municipality statuses via HTTP requests.
 * Provides methods to fetch, save, update, and delete municipality statuses.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class MunicipalityStatusHttpService extends BaseHttpService<Municipality> {

  protected override source = Constants.MUNICIPALITIES_STATUS_URL;

  readonly municipalityStatusList = signal<Municipality[]>([]);

  search: ISearch = {
    page: 1,
    size: 10
  };

  totalItems: number[] = [];

  /**
   * Fetches all municipality statuses from the server using pagination and updates internal state.
   *
   * Updates:
   * - `municipalityStatusList` with the received data
   * - Pagination metadata in `search`
   * - Page array in `totalItems`
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.municipalityStatusList,
      page: this.search.page || 1,
      size: this.search.size || 10,
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
   * Saves a new municipality status.
   *
   * @param status The municipality status to save.
   * @author dgutierrez
   */
  save(status: Municipality): void {
    this.add(status).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred adding the municipality status',
        context: `${this.constructor.name}#save`
      })
    });
  }

  /**
   * Updates an existing municipality status.
   *
   * @param status The municipality status to update.
   * @author dgutierrez
   */
  update(status: Municipality): void {
    if (!status.id) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: 'Municipality status ID is required for update'
      });
      return;
    }

    this.edit(status.id, status).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred updating the municipality status',
        context: `${this.constructor.name}#update`
      })
    });
  }

  /**
   * Deletes an existing municipality status.
   *
   * @param status The municipality status to delete.
   * @author dgutierrez
   */
  delete(status: Municipality): void {
    this.del(status.id).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred deleting the municipality status',
        context: `${this.constructor.name}#delete`
      })
    });
  }
}
