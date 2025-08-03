import {GeneralUtil} from '@common/utils';

/**
 * Data Transfer Object (DTO) for updating an announcement via multipart/form-data.
 * This version allows sending only the fields that are being updated.
 * The file field is optional.
 * @author dgutierrez
 */
export class UpdateAnnouncementFormDTO {
  title?: string | null;
  description?: string | null;
  stateId?: number | null;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  file?: File | null;

  constructor(values: Partial<UpdateAnnouncementFormDTO>) {
    this.title = values.title ?? null;
    this.description = values.description ?? null;
    this.stateId = values.stateId ?? null;
    this.startDate = values.startDate ?? null;
    this.endDate = values.endDate ?? null;
    this.file = values.file ?? null;
  }

  /**
   * Converts the DTO into FormData for PUT request with multipart/form-data.
   * Only includes values that are not null or undefined.
   * @author dgutierrez
   */
  toFormData(): FormData {
    const formData = new FormData();

    if (this.title) formData.append('title', this.title);
    if (this.description) formData.append('description', this.description);
    if (this.stateId !== null && this.stateId !== undefined) {
      formData.append('stateId', this.stateId.toString());
    }

    if (this.startDate) {
      formData.append('startDate', GeneralUtil.formatDateOnly(this.startDate));
    }

    if (this.endDate) {
      formData.append('endDate', GeneralUtil.formatDateOnly(this.endDate));
    }

    if (this.file instanceof File) {
      formData.append('file', this.file);
    }

    return formData;
  }
}
