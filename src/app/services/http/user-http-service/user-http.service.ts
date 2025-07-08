import {Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {User} from '@models';
import {AlertTypeEnum} from '@common/enums';
import {createPageArray} from '@common/utils';
import {Constants} from '@common/constants/constants';
import {ISearch} from '@common/interfaces/http';
import {UpdateUserRequestDto} from '@models/dto';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService extends BaseHttpService<User> {

  protected override source: string = Constants.USERS_URL;

  readonly userList = signal<User[]>([]);

  search: ISearch = {
    page: 1,
    size: 10,
  };

  totalItems: number[] = [];

  /**
   * Fetches all users with pagination and updates local state.
   *
   * Updates:
   * - `userList` signal with the fetched list
   * - `search` metadata (page, size, totalPages, etc.)
   * - `totalItems` array for pagination
   *
   * Displays an error alert if the request fails.
   *
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.userList,
      page: this.search.page || 1,
      size: this.search.size || 10,
      setSearchMeta: meta => {
        this.search = { ...this.search, ...meta };
      },
      setTotalItems: totalPages => {
        this.totalItems = createPageArray(totalPages);
      },
      context: `${this.constructor.name}#getAll`,
    });
  }

  /**
   * Sends a new user to the server for creation.
   * On success, shows a success alert and refreshes the paginated list.
   * On failure, displays an error alert and logs the error.
   *
   * @param user The user object to be created.
   * @returns void
   * @author dgutierrez
   */
  save(user: User): void {
    this.add(user).subscribe({
      next: response => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message,
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred adding the user',
        context: `${this.constructor.name}#save`,
      }),
    });
  }

  /**
   * Updates an existing user by its ID.
   * If the ID is not present, the update is aborted and an error alert is shown.
   * On success, shows a success alert and refreshes the paginated list.
   * On failure, displays an error alert and logs the error.
   *
   * @param user The user object with updated fields. Must contain a valid `id`.
   * @returns void
   * @author dgutierrez
   */
  update(user: User | UpdateUserRequestDto): void {
    if (!user.id) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: 'User ID is required for update',
      });
      return;
    }

    this.edit(user.id, user).subscribe({
      next: response => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message,
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred updating the user',
        context: `${this.constructor.name}#update`,
      }),
    });
  }

  /**
   * Deletes a user by its ID.
   * On success, displays a confirmation alert and refreshes the paginated list.
   * On failure, displays an error alert and logs the error.
   *
   * @param user The user object to be deleted. Must contain a valid `id`.
   * @returns void
   * @author dgutierrez
   */
  delete(user: User): void {
    this.del(user.id).subscribe({
      next: response => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message,
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred deleting the user',
        context: `${this.constructor.name}#delete`,
      }),
    });
  }
}
