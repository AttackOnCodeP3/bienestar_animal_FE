import {AnnouncementState} from './announcement-state';

/**
 * Announcement model
 * Represents an announcement with its details
 * @author dgutierrez
 */
export class Announcement {
  id: number | null;
  title: string | null;
  description: string | null;
  startDate: Date | string | null;
  endDate: Date | string | null;
  imageUrl: string | null;
  state: AnnouncementState | null;

  constructor(values: Partial<Announcement> = {}) {
    this.id = values.id ??= null;
    this.title = values.title ??= null;
    this.description = values.description ??= null;
    this.startDate = values.startDate ??= null;
    this.endDate = values.endDate ??= null;
    this.imageUrl = values.imageUrl ??= null;
    this.state = values.state ??= null;
  }
}
