/**
 * NotificationStatus model
 * Represents the status of a notification in the system.
 * @author dgutierrez
 */
export class NotificationStatus {
  id: number | null;
  name: string | null;
  description: string | null;

  constructor(values: Partial<NotificationStatus> = {}) {
    this.id = values.id || null;
    this.name = values.name || null;
    this.description = values.description || null;
  }
}
