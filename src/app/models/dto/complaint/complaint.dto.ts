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
  complaintTypeName: string | null;
  complaintStateName: string | null;

  constructor(values: Partial<ComplaintDto> = {}) {
    this.id = values.id ??= null;
    this.description = values.description ??= null;
    this.imageUrl = values.imageUrl ??= null;
    this.latitude = values.latitude ??= null;
    this.longitude = values.longitude ??= null;
    this.observations = values.observations ??= null;
    this.complaintTypeName = values.complaintTypeName ??= null;
    this.complaintStateName = values.complaintStateName ??= null;
  }
}
