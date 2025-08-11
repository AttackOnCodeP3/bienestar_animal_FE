/**
 * @author dgutierrez
 */
export class UpdateComplaintMultipartDto {
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  complaintTypeId: number | null;
  image: File | null;

  constructor(values: Partial<UpdateComplaintMultipartDto> = {}) {
    this.description = values.description ??= null;
    this.latitude = values.latitude ??= null;
    this.longitude = values.longitude ??= null;
    this.complaintTypeId = values.complaintTypeId ??= null;
    this.image = values.image ??= null;
  }

  /**
   * Convierte solo los campos definidos en FormData.
   */
  toFormData(): FormData {
    const fd = new FormData();

    if (this.description !== null) fd.append('description', this.description);
    if (this.latitude !== null) fd.append('latitude', String(this.latitude));
    if (this.longitude !== null) fd.append('longitude', String(this.longitude));
    if (this.complaintTypeId !== null) fd.append('complaintTypeId', String(this.complaintTypeId));
    if (this.image !== null) fd.append('image', this.image);

    return fd;
  }
}
