import {ComplaintTypeDTO} from './complaint-type.dto';
import {ComplaintStateDTO} from './complaint-state.dto';

/**
 * Complaint Data Transfer Object
 * @author dgutierrez
 */
export class ComplaintDto {
  id: number | null;
  description: string | null;
  imageUrl: string | null;
  latitude: number | null;
  longitude: number | null;
  observations: string | null;
  complaintTypeDTO: ComplaintTypeDTO | null;
  complaintStateDTO: ComplaintStateDTO | null;

  constructor(values: Partial<ComplaintDto> = {}) {
    this.id = values.id ??= null;
    this.description = values.description ??= null;
    this.imageUrl = values.imageUrl ??= null;
    this.latitude = values.latitude ??= null;
    this.longitude = values.longitude ??= null;
    this.observations = values.observations ??= null;
    this.complaintTypeDTO = values.complaintTypeDTO ??= null;
    this.complaintStateDTO = values.complaintStateDTO ??= null;
  }
}
