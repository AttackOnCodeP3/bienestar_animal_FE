/**
 * Notification Data Transfer Object
 * Represents a notification with various properties.
 * @author dgutierrez
 */
export class NotificationDTO {
  id: number | null;
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  dateIssued: string | null;
  actionUrl: string | null;
  notificationStatusName: string | null;
  notificationTypeName: string | null;

  constructor(values: Partial<NotificationDTO> = {}) {
    this.id = values.id ??= null;
    this.title = values.title ??= null;
    this.description = values.description ??= null;
    this.imageUrl = values.imageUrl ??= null;
    this.dateIssued = values.dateIssued ??= null;
    this.actionUrl = values.actionUrl ??= null;
    this.notificationStatusName = values.notificationStatusName ??= null;
    this.notificationTypeName = values.notificationTypeName ??= null;
  }
}
