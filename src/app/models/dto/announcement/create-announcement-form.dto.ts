import {GeneralUtil} from '@common/utils';

/**
 * Data Transfer Object (DTO) for creating an announcement form.
 * @author dgutierrez
 */
export class CreateAnnouncementFormDTO {
  title: string | null;
  description: string | null;
  stateId: number | null;
  startDate: Date | string | null;
  endDate: Date | string | null;
  file: File | null;

  constructor(values: Partial<CreateAnnouncementFormDTO>) {
    this.title = values.title ??= null;
    this.description = values.description ??= null;
    this.stateId = values.stateId ??= null;
    this.startDate = values.startDate ??= null;
    this.endDate = values.endDate ??= null;
    this.file = values.file ??= null;
  }

  /**
   * Converts the DTO to FormData for multipart/form-data submission.
   * @author dgutierrez
   */
  toFormData(): FormData {
    const formData = new FormData();

    if (this.title !== null) formData.append('title', this.title);
    if (this.description !== null) formData.append('description', this.description);
    if (this.stateId !== null) formData.append('stateId', this.stateId.toString());

    if (this.startDate !== null) {
      formData.append('startDate', GeneralUtil.formatDateOnly(this.startDate));
    }

    if (this.endDate !== null) {
      formData.append('endDate', GeneralUtil.formatDateOnly(this.endDate));
    }

    if (this.file !== null) formData.append('file', this.file);

    return formData;
  }
}
