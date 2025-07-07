import { Injectable } from '@angular/core';
import {UserManagementDisplayedColumnsTableEnum} from 'common/enums/tables';

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
}
