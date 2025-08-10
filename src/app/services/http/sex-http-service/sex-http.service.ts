import {Injectable, signal} from '@angular/core';
import {createPageArray} from '@common/utils';
import {ISearch} from '@common/interfaces/http';
import {Constants} from '@common/constants/constants';
import {BaseHttpService} from '../base-http-service/base-http.service';
import {Sex} from '@models';

/**
 * Service for handling HTTP requests related to sexes.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class SexHttpService extends BaseHttpService<Sex> {

  protected override source = Constants.SEX_URL;

  readonly sexList = signal<Sex[]>([]);

  search: ISearch = {
    page: 1,
    size: 10
  };

  totalItems: number[] = [];

  /**
   * Fetches all sex entries paginated
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.sexList,
      page: this.search.page || 1,
      size: this.search.size || 10,
      setSearchMeta: (meta) => {
        this.search = {...this.search, ...meta};
      },
      setTotalItems: (totalPages) => {
        this.totalItems = createPageArray(totalPages);
      },
      context: `${this.constructor.name}#getAll`
    });
  }

  /**
   * Fetches a single sex entry by ID
   * @param id ID of the sex entity
   * @returns Observable<Sex>
   * @author dgutierrez
   */
  getOneById(id: number) {
    return this.getOne(id);
  }
}
