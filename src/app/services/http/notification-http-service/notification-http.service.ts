import {computed, inject, Injectable, signal} from '@angular/core';
import { Constants } from '@common/constants/constants';
import { createPageArray } from '@common/utils';
import { IResponse, ISearch } from '@common/interfaces/http';
import { BaseHttpService } from '@services/http';
import { Notification } from '@models';
import {NotificationStatusEnum} from '@common/enums';
import {NotificationDTO} from '@models/dto';
import {AlertService} from '@services/general';

@Injectable({
  providedIn: 'root',
})
export class NotificationHttpService extends BaseHttpService<Notification> {
  protected override source = Constants.NOTIFICATIONS_URL;

  private readonly isLoading = signal<boolean>(false);
  readonly isNotificationsLoading = computed(() => this.isLoading());

  private readonly isUnreadLoading = signal<boolean>(false);
  readonly isUnreadNotificationsLoading = computed(() => this.isUnreadLoading());

  readonly notificationDTOList = signal<NotificationDTO[]>([]);
  readonly selectedNotification = signal<Notification | null>(null);

  readonly unreadNotificationList = signal<Notification[]>([]);

  readonly unreadCount = signal<number>(0);
  readonly myStatusCount = signal<number>(0);
  readonly myUnreadCount = signal<number>(0);
  readonly hasReachedEnd = signal<boolean>(false);

  readonly showUnreadBadge = computed(() => this.unreadCount() > 0);
  readonly showMyUnreadBadge = computed(() => this.myUnreadCount() <= 0);
  readonly isEmpty = computed(() => !this.isNotificationsLoading() && this.notificationDTOList().length === 0);
  readonly isUnreadListEmpty = computed(() => !this.isUnreadNotificationsLoading() && this.unreadNotificationList().length === 0);

  search: ISearch = {
    page: 1,
    size: 20,
  };
  totalItems: number[] = [];

  get currentPage(): number {
    return this.search.page ?? 1;
  }

  /**
   * @author dgutierrez
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
   * @author dgutierrez
   */
  countMyUnreadNotifications(): void {

    this.http.get<IResponse<number>>(`${this.sourceUrl}/count-my-notifications-by-status`, {
      params: this.buildUrlParams({ statusId: NotificationStatusEnum.SENT }),
    }).subscribe({
      next: (res) => {
        this.myUnreadCount.set(res.data);
      },
      error: this.handleError({
        message: 'Error al contar tus notificaciones no leídas.',
        context: `${this.constructor.name}#countMyUnreadNotifications`,
      }),
    });
  }

  /**
   * @author dgutierrez
   */
  getMyUnreadNotifications(options: {
    page?: number;
    nextPage?: boolean;
    previousPage?: boolean;
  } = {}): void {
    this.search = this.updatePageState(this.search, options);
    const params = {
      page: this.search.page,
      size: this.search.size,
      read: false, // Asumiendo que tu backend lo acepta
    };

    this.isUnreadLoading.set(true);

    this.http.get<IResponse<Notification[]>>(`${this.sourceUrl}/my-notifications`, {
      params: this.buildUrlParams(params),
    }).subscribe({
      next: (res) => {
        this.unreadNotificationList.set(res.data);
        this.updatePagination(res.meta?.totalPages ?? 0);
        this.search = { ...this.search, ...res.meta };
      },
      error: this.handleError({
        message: 'Error al obtener tus notificaciones no leídas.',
        context: `${this.constructor.name}#getMyUnreadNotifications`,
      }),
      complete: () => this.isUnreadLoading.set(false),
    });
  }

  /**
   * @author dgutierrez
   */
  getNotificationById(notificationId: number, callback?: VoidFunction): void {
    this.http.get<IResponse<Notification>>(`${this.sourceUrl}/${notificationId}`).subscribe({
      next: (res) => {
        this.selectedNotification.set(res.data);
        callback?.();
      },
      error: this.handleError({
        message: 'Error al obtener la notificación.',
        context: `${this.constructor.name}#getNotificationById`,
      }),
    });
  }

  /**
   * @author dgutierrez
   */
  countMyNotificationsByStatus(statusId: number): void {
    this.http.get<IResponse<number>>(`${this.sourceUrl}/count-my-notifications-by-status`, {
      params: this.buildUrlParams({ statusId }),
    }).subscribe({
      next: (res) => {
        this.myStatusCount.set(res.data);
      },
      error: this.handleError({
        message: 'Error al contar tus notificaciones por estado.',
        context: `${this.constructor.name}#countMyNotificationsByStatus`,
      }),
    });
  }

  /**
   * @author dgutierrez
   */
  countByStatus(statusId: number): void {
    this.http.get<IResponse<number>>(`${this.sourceUrl}/count-by-status`, {
      params: this.buildUrlParams({ statusId }),
    }).subscribe({
      next: (res) => {
        this.unreadCount.set(res.data);
      },
      error: this.handleError({
        message: 'Error al contar notificaciones por estado.',
        context: `${this.constructor.name}#countByStatus`,
      }),
    });
  }

  /**
   * @author dgutierrez
   */
  markAllMyNotificationsAsRead(callback?: VoidFunction): void {
    this.http.put<IResponse<number>>(`${this.sourceUrl}/mark-my-notifications-as-read`, {}).subscribe({
      next: (res) => {
        console.info(`Se marcaron ${res.data} notificaciones como leídas.`);
        callback?.();
        this.countMyUnreadNotifications();
        this.getMyNotifications();
      },
      error: this.handleError({
        message: 'Error al marcar tus notificaciones como leídas.',
        context: `${this.constructor.name}#markAllMyNotificationsAsRead`,
      }),
    });
  }

  /**
   * @author dgutierrez
   */
  private fetchNotifications(): void {
    const params = {
      page: this.search.page,
      size: this.search.size,
    };

    this.isLoading.set(true);

    this.http.get<IResponse<NotificationDTO[]>>(`${this.sourceUrl}/my-notifications`, {
      params: this.buildUrlParams(params),
    }).subscribe({
      next: (res) => {
        if ((this.search.page ?? 1) > 1) {
          const updatedList = [...this.notificationDTOList(), ...res.data];
          this.notificationDTOList.set(updatedList);
        } else {
          this.notificationDTOList.set(res.data);
        }

        this.updatePagination(res.meta?.totalPages ?? 0);
        this.search = { ...this.search, ...res.meta };

        const currentPage = this.search.page ?? 1;
        const totalPages = this.search.totalPages ?? res.meta?.totalPages ?? 1;
        this.hasReachedEnd.set(currentPage >= totalPages);
      },
      error: this.handleError({
        message: 'Error al obtener tus notificaciones.',
        context: `${this.constructor.name}#fetchNotifications`,
      }),
      complete: () => this.isLoading.set(false),
    });
  }

  /**
   * @author dgutierrez
   */
  private updatePagination(totalPages: number): void {
    this.totalItems = createPageArray(totalPages);
    if (this.currentPage > totalPages && totalPages > 0) {
      this.search.page = totalPages;
    }
  }
}
