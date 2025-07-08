import { Injectable } from '@angular/core';
import {UserManagementDisplayedColumnsTableEnum} from 'common/enums/tables';
import {PageEvent} from '@angular/material/paginator';
import {ISearch} from '@common/interfaces/http';

/**
 * Service for managing table-related functionality, specifically for common logic across tables.
 * This service provides access to table-related enums and constants.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class TableService {

  /**
   * The default page size for tables.
   * @author dgutierrez
   */
  readonly pageSizeOptions = [5, 10, 20];

  get userManagementDisplayedColumnsTableEnum() {
    return UserManagementDisplayedColumnsTableEnum;
  }

  /**
   * Updates pagination parameters and executes the data fetch callback.
   * @param event Event from Angular Material paginator
   * @param search Search object modified by reference
   * @param fetchFn Function to fetch paginated data
   * @author dgutierrez
   */
  onPageChangeGeneric(
    event: PageEvent,
    search: ISearch,
    fetchFn: VoidFunction
  ): void {
    search.page = event.pageIndex + 1;
    search.size = event.pageSize;
    fetchFn();
  }
}
