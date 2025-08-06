import {Injectable, signal} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {ISearch} from '@common/interfaces/http';
import {BaseHttpService} from '@services/http/base-http-service/base-http.service';
import {ComplaintStateDto} from '@models/dto';
import {createPageArray} from '@common/utils';

/**
 * Service for handling HTTP requests related to complaint states.
 * These represent the lifecycle stages of a community complaint (e.g., Open, Approved, Completed).
 *
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class ComplaintStateHttpService extends BaseHttpService<ComplaintStateDto> {

  protected override source = Constants.COMPLAINT_STATES_URL;

  readonly complaintStateList = signal<ComplaintStateDto[]>([]);

  search: ISearch = {
    page: 1,
    size: 50
  };

  totalItems: number[] = [];

  /**
   * Fetches all complaint states using pagination.
   * Updates the internal signal and pagination metadata.
   *
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.complaintStateList,
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
   * Fetches a single complaint state by its ID.
   *
   * @param id Complaint state ID
   * @returns Observable<ComplaintState>
   * @author dgutierrez
   */
  getOneById(id: number) {
    return this.getOne(id);
  }
}
