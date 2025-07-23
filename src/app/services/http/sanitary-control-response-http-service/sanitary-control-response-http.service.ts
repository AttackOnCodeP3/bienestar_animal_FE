import {Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http/base-http-service/base-http.service';
import {SanitaryControlResponse} from '@models';
import {ISearch} from '@common/interfaces/http';
import {createPageArray} from '@common/utils';
import {Constants} from '@common/constants/constants';

/**
 * Service for handling HTTP requests related to sanitary control responses.
 * These include catalog values like: Sí, No, No sé.
 *
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class SanitaryControlResponseHttpService extends BaseHttpService<SanitaryControlResponse> {

  protected override source = Constants.SANITARY_CONTROL_RESPONSES_URL;

  readonly responseList = signal<SanitaryControlResponse[]>([]);

  search: ISearch = {
    page: 1,
    size: 50
  };

  totalItems: number[] = [];

  /**
   * Fetches all sanitary control responses paginated
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.responseList,
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
   * Fetches a single sanitary control response by ID
   * @param id response ID
   * @returns Observable<SanitaryControlResponse>
   * @author dgutierrez
   */
  getOneById(id: number) {
    return this.getOne(id);
  }
}
