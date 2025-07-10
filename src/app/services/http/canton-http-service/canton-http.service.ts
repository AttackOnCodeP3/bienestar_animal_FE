import {Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {Constants} from '@common/constants/constants';
import {IResponse, ISearch} from '@common/interfaces/http';
import {Canton, District} from '@models';
import {createPageArray} from '@common/utils';

@Injectable({
  providedIn: 'root'
})
export class CantonHttpService extends BaseHttpService<Canton> {

  protected override source = Constants.GET_ALL_CANTONS_URL;

  readonly cantonList = signal<Canton[]>([]);
  readonly districtsByCanton = signal<District[]>([]);

  search: ISearch = { page: 1, size: 10 };
  totalItems: number[] = [];

  /**
   * Fetches all cantons with pagination and updates local state.
   * Uses shared base method to reduce duplicated logic.
   *
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.cantonList,
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
   * Fetches districts associated with a given canton ID.
   * Updates signal with result or shows alert if the request fails.
   *
   * @param cantonId The ID of the canton
   * @author dgutierrez
   */
  getDistrictsByCantonId(cantonId: number): void {
    const url = `${this.sourceUrl}/${cantonId}/districts`;
    this.http.get<IResponse<District[]>>(url).subscribe({
      next: (res) => {
        this.districtsByCanton.set(res.data);
      },
      error: this.handleError({
        message: 'Error loading districts for canton',
        context: `${this.constructor.name}#getDistrictsByCantonId`,
      })
    });
  }
}
