/**
 * AnnouncementState model
 * Represents the state of an announcement
 * @author dgutierrez
 */
export class AnnouncementState {
  id: number | null;
  name: string | null;
  description: string | null;

  constructor(values: Partial<AnnouncementState> = {}) {
    this.id = values.id ??= null;
    this.name = values.name ??= null;
    this.description = values.description ??= null;
  }
}
