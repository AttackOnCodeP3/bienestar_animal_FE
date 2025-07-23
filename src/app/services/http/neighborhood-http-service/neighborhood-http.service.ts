import {Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {Constants} from '@common/constants/constants';
import {ISearch} from '@common/interfaces/http';
import {Neighborhood} from '@models';
import {createPageArray} from '@common/utils';

@Injectable({
  providedIn: 'root'
})
export class NeighborhoodHttpService extends BaseHttpService<Neighborhood>{

  protected override source = Constants.NEIGHBORHOODS_URL;

  neighborhoodList = signal<Neighborhood[]>([]);

  search: ISearch = { page: 1, size: 100 };
  totalItems: number[] = [];

  /**
   * Fetches a paginated list of neighborhoods from the server
   * and updates internal signals and pagination state.
   * Displays an alert if the operation fails.
   *
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.neighborhoodList,
      page: this.search.page || 1,
      size: this.search.size || 100,
      setSearchMeta: (meta) => this.search = { ...this.search, ...meta },
      setTotalItems: (totalPages) => {
        createPageArray(totalPages);
      },
      context: `${this.constructor.name}#getAll`,
    });
  }
}
