import {Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {Constants} from '@common/constants/constants';
import {District, Neighborhood} from '@models';
import {IResponse, ISearch} from '@common/interfaces/http';
import {createPageArray} from '@common/utils';

@Injectable({
  providedIn: 'root'
})
export class DistrictHttpService extends BaseHttpService<District>{

  protected override source = Constants.GET_ALL_DISTRICTS_URL;

  readonly districtList = signal<District[]>([]);
  readonly neighborhoodsByDistrict = signal<Neighborhood[]>([]);

  search: ISearch = { page: 1, size: 10 };
  totalItems: number[] = [];

  /**
   * Fetches all districts from the server using pagination and updates internal state.
   *
   * Updates:
   * - `districtList` with fetched data
   * - pagination metadata in `search`
   * - pages array in `totalItems`
   *
   * Displays an alert if the operation fails.
   *
   * @returns void
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.districtList,
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
   * Fetches neighborhoods for a specific district ID.
   * Updates signal with the result or shows alert on failure.
   *
   * @param districtId ID of the district
   * @author dgutierrez
   */
  getNeighborhoodsByDistrictId(districtId: number): void {
    const url = `${this.sourceUrl}/${districtId}/neighborhoods`;
    this.http.get<IResponse<Neighborhood[]>>(url).subscribe({
      next: (res) => {
        this.neighborhoodsByDistrict.set(res.data);
      },
      error: this.handleError({
        message: 'Error loading neighborhoods',
        context: `${this.constructor.name}#getNeighborhoodsByDistrictId`,
      })
    });
  }
}
