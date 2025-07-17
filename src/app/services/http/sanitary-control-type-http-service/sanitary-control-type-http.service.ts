import {Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http/base-http-service/base-http.service';
import {SanitaryControlType} from '@models';
import {Constants} from '@common/constants/constants';
import {ISearch} from '@common/interfaces/http';
import {createPageArray} from '@common/utils';

/**
 * Service for handling HTTP requests related to sanitary control types.
 * These include types like vaccination, deworming, sterilization, etc.
 *
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class SanitaryControlTypeHttpService extends BaseHttpService<SanitaryControlType> {

  protected override source = Constants.SANITARY_CONTROL_TYPES_URL;

  readonly sanitaryControlTypeList = signal<SanitaryControlType[]>([]);

  search: ISearch = {
    page: 1,
    size: 50
  };

  totalItems: number[] = [];

  /**
   * Fetches all sanitary control types paginated
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.sanitaryControlTypeList,
      page: this.search.page || 1,
      size: this.search.size || 10,
      setSearchMeta: (meta) => {
        this.search = { ...this.search, ...meta };
      },
      setTotalItems: (totalPages) => {
        this.totalItems = createPageArray(totalPages);
      },
      context: `${this.constructor.name}#getAll`
    });
  }

  /**
   * Fetches a single sanitary control type by ID
   * @param id sanitary control type ID
   * @returns Observable<SanitaryControlType>
   * @author dgutierrez
   */
  getOneById(id: number) {
    return this.getOne(id);
  }
}
