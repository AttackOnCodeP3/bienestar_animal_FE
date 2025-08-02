import {Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http/base-http-service/base-http.service';
import {createPageArray} from '@common/utils';
import {ISearch} from '@common/interfaces/http';
import {Constants} from '@common/constants/constants';
import {ComplaintType} from '@models';

/**
 * Service for handling HTTP requests related to complaint types.
 * These are used to categorize different types of community complaints (e.g. noise, trash, etc).
 *
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class ComplaintTypeHttpService extends BaseHttpService<ComplaintType> {

  protected override source = Constants.COMPLAINT_TYPES_URL;

  readonly complaintTypeList = signal<ComplaintType[]>([]);

  search: ISearch = {
    page: 1,
    size: 50
  };

  totalItems: number[] = [];

  /**
   * Fetches all complaint types using pagination.
   * Updates the internal signal and metadata.
   *
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.complaintTypeList,
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
   * Fetches a single complaint type by its ID.
   *
   * @param id Complaint type ID
   * @returns Observable<ComplaintType>
   * @author dgutierrez
   */
  getOneById(id: number) {
    return this.getOne(id);
  }
}
