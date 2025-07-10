import { Injectable, signal } from '@angular/core';
import { BaseHttpService } from '@services/http';
import { ISearch } from '@common/interfaces/http';
import { Constants } from '@common/constants/constants';
import { Role } from '@models';
import { AlertTypeEnum } from '@common/enums';
import { createPageArray } from '@common/utils';

/**
 * Service for managing roles via HTTP requests.
 * Provides methods to fetch, save, update, and delete roles.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class RoleHttpService extends BaseHttpService<Role> {

  protected override source = Constants.ROLES_URL;

  readonly roleList = signal<Role[]>([]);

  search: ISearch = {
    page: 1,
    size: 10
  };

  totalItems: number[] = [];

  /**
   * Fetches all roles from the server using pagination and updates internal state.
   *
   * Updates:
   * - `roleList` with the received data
   * - Pagination metadata in `search`
   * - Page array in `totalItems`
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.roleList,
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
   * Saves a new role.
   *
   * @param role The role item to save.
   * @author dgutierrez
   */
  save(role: Role): void {
    this.add(role).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred adding the role',
        context: `${this.constructor.name}#save`
      })
    });
  }

  /**
   * Updates an existing role.
   *
   * @param role The role item to update.
   * @author dgutierrez
   */
  update(role: Role): void {
    if (!role.id) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: 'Role ID is required for update'
      });
      return;
    }

    this.edit(role.id, role).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred updating the role',
        context: `${this.constructor.name}#update`
      })
    });
  }

  /**
   * Deletes an existing role.
   *
   * @param role The role item to delete.
   * @author dgutierrez
   */
  delete(role: Role): void {
    this.del(role.id).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred deleting the role',
        context: `${this.constructor.name}#delete`
      })
    });
  }
}
