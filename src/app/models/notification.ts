import {User} from './user';
import {NotificationStatus} from './notification-status';
import {NotificationType} from './notification-type';

/**
 * The Notification model
 * Represents a notification in the system.
 * @author dgutierrez
 */
export class Notification {
  id: number | null;
  actionUrl: string | null;
  dateIssued: string | Date | null;
  description: string | null;
  imageUrl: string | null;
  isRead: boolean | null;
  notificationStatus: NotificationStatus | null;
  notificationType: NotificationType | null;
  title: string | null;
  user: User | null;

  constructor(values: Partial<Notification> = {}) {
    this.id = values.id || null;
    this.actionUrl = values.actionUrl || null;
    this.dateIssued = values.dateIssued || null;
    this.description = values.description || null;
    this.imageUrl = values.imageUrl || null;
    this.isRead = values.isRead || null;
    this.notificationStatus = values.notificationStatus || null;
    this.notificationType = values.notificationType || null;
    this.title = values.title || null;
    this.user = values.user || null;
  }
}
