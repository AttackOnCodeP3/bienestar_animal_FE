import {Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {Municipality} from '@models';
import {ISearch} from '@common/interfaces/http';
import {Constants} from '@common/constants/constants';
import {AlertTypeEnum} from '@common/enums';
import {createPageArray} from '@common/utils';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityHttpService extends BaseHttpService<Municipality> {

  protected override source: string = Constants.MUNICIPALITIES_URL;

  readonly municipalityList = signal<Municipality[]>([]);

  search: ISearch = {
    page: 1,
    size: 10
  };

  totalItems: number[] = [];

  /**
   * Fetches all municipalities with pagination and updates local state.
   *
   * Updates:
   * - `municipalityList` signal with the fetched list
   * - `search` metadata (page, size, totalPages, etc.)
   * - `totalItems` array for pagination
   *
   * Displays an error alert if the request fails.
   *
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.municipalityList,
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
   * Sends a new municipality to the server for creation.
   * On success, shows a success alert and refreshes the paginated list.
   * On failure, displays an error alert and logs the error.
   *
   * @param municipality The municipality object to be created.
   * @returns void
   * @author dgutierrez
   */
  save(municipality: Municipality): void {
    this.add(municipality).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message,
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred adding the municipality',
        context: `${this.constructor.name}#save`,
      }),
    });
  }

  /**
   * Updates an existing municipality by its ID.
   * If the ID is not present, the update is aborted and an error alert is shown.
   * On success, shows a success alert and refreshes the paginated list.
   * On failure, displays an error alert and logs the error.
   *
   * @param municipality The municipality object with updated fields. Must contain a valid `id`.
   * @returns void
   * @author dgutierrez
   */
  update(municipality: Municipality): void {
    if (!municipality.id) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: 'Municipality ID is required for update',
      });
      return;
    }

    this.edit(municipality.id, municipality).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message,
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred updating the municipality',
        context: `${this.constructor.name}#update`,
      }),
    });
  }

  /**
   * Deletes a municipality by its ID.
   * On success, displays a confirmation alert and refreshes the paginated list.
   * On failure, displays an error alert and logs the error.
   *
   * @param municipality The municipality object to be deleted. Must contain a valid `id`.
   * @returns void
   * @author dgutierrez
   */
  delete(municipality: Municipality): void {
    this.del(municipality.id).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message,
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred deleting the municipality',
        context: `${this.constructor.name}#delete`,
      }),
    });
  }
}
