import {Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {ISearch} from '@common/interfaces/http';
import {Constants} from '@common/constants/constants';
import {Interest} from '@models';
import {AlertTypeEnum} from '@common/enums';
import {createPageArray} from '@common/utils';


@Injectable({
  providedIn: 'root'
})
export class InterestHttpService extends BaseHttpService<Interest> {

  protected override source = Constants.INTERESTS_URL;

  readonly interestList = signal<Interest[]>([]);

  search: ISearch = {
    page: 1,
    size: 10
  };

  totalItems: number[] = [];

  /**
   * Fetches all interests from the server using pagination and updates internal state.
   *
   * Updates:
   * - `interestList` with the received data
   * - Pagination metadata in `search`
   * - Page array in `totalItems`
   *
   * Displays an error message if the operation fails.
   *
   * @returns void
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.interestList,
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
   * Saves a new interest.
   *
   * @param interest The interest item to save.
   * @author dgutierrez
   */
  save(interest: Interest): void {
    this.add(interest).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred adding the interest',
        context: `${this.constructor.name}#save`
      })
    });
  }

  /**
   * Updates an existing interest.
   *
   * @param interest The interest item to update.
   * @author dgutierrez
   */
  update(interest: Interest): void {
    if (!interest.id) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: 'Interest ID is required for update'
      });
      return;
    }

    this.edit(interest.id, interest).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred updating the interest',
        context: `${this.constructor.name}#update`
      })
    });
  }

  /**
   * Deletes an existing interest.
   *
   * @param interest The interest item to delete.
   * @author dgutierrez
   */
  delete(interest: Interest): void {
    this.del(interest.id).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred deleting the interest',
        context: `${this.constructor.name}#delete`
      })
    });
  }
}
