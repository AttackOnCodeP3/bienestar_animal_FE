/**
 * CreateComplaintMultipartDto is a Data Transfer Object (DTO) used
 * for creating a complaint with multipart/form-data.
 * It encapsulates the required fields to register a complaint, including:
 * - description (text)
 * - coordinates (latitude, longitude)
 * - complaint type ID
 * - optional image file
 *
 * It also includes a helper method to convert the data into FormData
 * for HTTP multipart submission.
 *
 * @author dgutierrez
 */
export class CreateComplaintMultipartDto {
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  complaintTypeId: number | null;
  image: File | null;

  constructor(values: Partial<CreateComplaintMultipartDto> = {}) {
    this.description = values.description ??= null;
    this.latitude = values.latitude ??= null;
    this.longitude = values.longitude ??= null;
    this.complaintTypeId = values.complaintTypeId ??= null;
    this.image = values.image ??= null;
  }

  /**
   * Converts the DTO into FormData for multipart/form-data submission.
   * @returns FormData object containing the complaint data.
   * @author dgutierrez
   */
  toFormData(): FormData {
    const formData = new FormData();

    if (this.description !== null) formData.append('description', this.description);
    if (this.latitude !== null) formData.append('latitude', this.latitude.toString());
    if (this.longitude !== null) formData.append('longitude', this.longitude.toString());
    if (this.complaintTypeId !== null) formData.append('complaintTypeId', this.complaintTypeId.toString());
    if (this.image !== null) formData.append('image', this.image);

    return formData;
  }
}
