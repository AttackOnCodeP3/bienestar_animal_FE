/**
 * NotificationType class represents a type of notification in the system.
 * @author dgutierrez
 */
export class NotificationType {
  id: number | null;
  name: string | null;
  description: string | null;

  constructor(values: Partial<NotificationType> = {}) {
    this.id = values.id || null;
    this.name = values.name || null;
    this.description = values.description || null;
  }
}
