import { computed, Injectable, signal } from '@angular/core';
import { Constants } from '@common/constants/constants';
import { createPageArray } from '@common/utils';
import { IResponse, ISearch } from '@common/interfaces/http';
import { BaseHttpService } from '@services/http';
import { Notification } from '@models';

@Injectable({
  providedIn: 'root',
})
export class NotificationHttpService extends BaseHttpService<Notification> {
  protected override source = Constants.NOTIFICATIONS_URL;

  readonly myNotificationList = signal<Notification[]>([]);
  readonly notificationSelected = signal<Notification | null>(null);
  readonly notificationCountByStatusRead = signal<number>(0);
  readonly showMyNotificationCountBadgeRead = computed(() => this.notificationCountByStatusRead() <= 0);
  readonly myNotificationCountByStatus = signal<number>(0);
  private readonly isLoading = signal<boolean>(false);
  readonly isNotificationsLoading = computed(() => this.isLoading());
  readonly isNotificationsEmpty = computed(() => {
    return this.myNotificationList().length === 0 && !this.isNotificationsLoading();
  });

  search: ISearch = {
    page: 1,
    size: 20,
  };

  totalItems: number[] = [];

  get searchPage(): number {
    return this.search.page ?? 1;
  }

  /**
   * Public method to load notifications with optional pagination control.
   *
   * @param options Object with page control keys
   * @example getMyNotifications({ nextPage: true })
   * @example getMyNotifications({ page: 3 })
   */
  getMyNotifications(options: {
    page?: number;
    nextPage?: boolean;
    previousPage?: boolean;
  } = {}): void {
    this.search = this.updatePageState(this.search, options);
    this.fetchNotifications();
  }

  /**
   * Fetches a notification by its unique ID and updates the signal state.
   *
   * @param notificationId Notification ID
   * @param callback Optional callback on success
   * @author dgutierrez
   */
  getNotificationById(notificationId: number, callback?: VoidFunction): void {
    this.http.get<IResponse<Notification>>(`${this.sourceUrl}/${notificationId}`).subscribe({
      next: (res) => {
        this.notificationSelected.set(res.data);
        callback?.();
      },
      error: this.handleError({
        message: 'An error occurred while retrieving the notification by ID.',
        context: `${this.constructor.name}#getNotificationById`,
      }),
    });
  }

  /**
   * Counts notifications for the current user by status ID.
   * @param statusId Status ID to filter notifications.
   * @author dgutierrez
   */
  countMyNotificationsByStatus(statusId: number): void {
    this.http.get<IResponse<number>>(`${this.sourceUrl}/count-my-notifications-by-status`, {
      params: this.buildUrlParams({ statusId }),
    }).subscribe({
      next: (res) => {
        this.myNotificationCountByStatus.set(res.data);
      },
      error: this.handleError({
        message: 'Ocurrió un error al contar tus notificaciones por estado.',
        context: `${this.constructor.name}#countMyNotificationsByStatus`,
      }),
    });
  }

  /**
   * Fetches the count of notifications by status ID and updates the signal.
   * @param statusId ID of the notification status to filter by.
   * @author dgutierrez
   */
  countByStatus(statusId: number): void {
    this.http.get<IResponse<number>>(`${this.sourceUrl}/count-by-status`, {
      params: this.buildUrlParams({ statusId }),
    }).subscribe({
      next: (res) => {
        this.notificationCountByStatusRead.set(res.data);
      },
      error: this.handleError({
        message: 'Ocurrió un error al contar las notificaciones por estado.',
        context: `${this.constructor.name}#countByStatus`,
      }),
    });
  }

  /**
   * Updates a notification by its unique ID and updates the signal state.
   * author dgutierrez
   */
  private fetchNotifications(): void {
    const params = {
      page: this.search.page,
      size: this.search.size,
    };

    this.isLoading.set(true);
    this.http.get<IResponse<Notification[]>>(`${this.sourceUrl}/my-notifications`, {
      params: this.buildUrlParams(params),
    }).subscribe({
      next: (res) => {
        this.myNotificationList.set(res.data);
        this.updatePagination(res.meta?.totalPages ?? 0);
        this.search = { ...this.search, ...res.meta };
      },
      error: this.handleError({
        message: 'An error occurred while fetching user notifications.',
        context: `${this.constructor.name}#fetchNotifications`,
      }),
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Updates the pagination state based on the total number of pages.
   * @param totalPages Total number of pages available
   * @author dgutierrez
   */
  private updatePagination(totalPages: number): void {
    this.totalItems = createPageArray(totalPages);
    if (this.searchPage > totalPages && totalPages > 0) {
      this.search.page = totalPages;
    }
  }
}
