import {ComplaintType} from './complaint-type';
import {User} from './user';

/**
 * The Complaint represents a user-submitted complaint in the system by any user.
 * @author dgutierrez
 */
export class Complaint {
  id: number | null;
  description: string | null;
  imageUrl: string | null;
  latitude: number | null;
  longitude: number | null;
  complaintType: ComplaintType | null;
  createdBy: User | null;

  constructor(values: Partial<Complaint> = {}) {
    this.id = values.id ??= null;
    this.description = values.description ??= null;
    this.imageUrl = values.imageUrl ??= null;
    this.latitude = values.latitude ??= null;
    this.longitude = values.longitude ??= null;
    this.complaintType = values.complaintType ??= null;
    this.createdBy = values.createdBy ??= null;
  }
}
