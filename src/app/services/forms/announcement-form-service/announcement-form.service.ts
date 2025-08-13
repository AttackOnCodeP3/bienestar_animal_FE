import {computed, inject, Injectable, signal} from '@angular/core';
import {Validators} from '@angular/forms';
import {FileInput} from 'ngx-custom-material-file-input';

import {notSelectOptionValidator} from '@common/forms';
import {FormsService} from '@services/general';
import {Announcement} from '@models';

/**
 * Service to handle the announcement form logic.
 * @author dgutierrez
 */
@Injectable()
export class AnnouncementFormService {

  readonly formsService = inject(FormsService);

  /**
   * Signal to indicate if the form is in update mode.
   * This is used to determine if the form should be built for creating a new announcement or
   * updating an existing one.
   * @author dgutierrez
   */
  readonly isFormUpdate = signal(false);

  readonly form = computed(() => {
    const isUpdate = this.isFormUpdate();
    if (isUpdate) {
      return this.buildAnnouncementForm({isUpdate: true});
    }

    return this.buildAnnouncementForm();
  });

  /**
   * Retrieves the image file from the form.
   * @author dgutierrez
   */
  getImageFile() {
    const {file} = this.form().getRawValue();
    if (!file || !file.files || file.files.length === 0) {
      return null;
    }
    return file.files[0];
  }

  /**
   * Patches the form with the data from an existing announcement.
   * @param announcement The announcement data to patch into the form.
   * @author dgutierrez
   */
  patchFormWithAnnouncementData(announcement: Announcement) {
    this.form().patchValue({
      title: announcement.title,
      description: announcement.description,
      announcementState: announcement.state?.id,
      startDate: announcement.startDate ? new Date(announcement.startDate) : null,
      endDate: announcement.endDate ? new Date(announcement.endDate) : null,
      file: null
    });
  }

  /**
   * Submits the form to create a new announcement.
   * @author dgutierrez
   */
  buildAnnouncementForm({ isUpdate = false }: { isUpdate?: boolean } = {}) {
    const form = this.formsService.formsBuilder.group({
      title: this.formsService.formsBuilder.control('', [Validators.required]),
      description: this.formsService.formsBuilder.control(''),
      announcementState: this.formsService.formsBuilder.control<number>(this.formsService.filterOptionEnum.SELECT_OPTION, [Validators.required, notSelectOptionValidator]),
      startDate: this.formsService.formsBuilder.control<Date | string | null>(null, [Validators.required]),
      endDate: this.formsService.formsBuilder.control<Date | string | null>(null, [Validators.required]),
      file: this.formsService.formsBuilder.control<FileInput | null>(
        null,
        {
          validators: this.formsService.getFileValidators({
            acceptTypes: this.formsService.imageFileAcceptTypes.split(',').map(s => s.trim()),
            maxSizeInMB: 1,
            required: true
          }),
          nonNullable: true
        }
      )
    });

    if (isUpdate) {
      form.get('file')?.clearValidators();
      form.get('file')?.updateValueAndValidity();
    }

    return form;
  }

  /**
   * Extracts and returns the current values from the announcement form,
   * formatted as an object compatible with UpdateAnnouncementFormDTO.
   * @author dgutierrez
   */
  getAnnouncementFormValues() {
    const formValue = this.form().getRawValue();

    return {
      title: formValue.title?.trim() ?? null,
      description: formValue.description?.trim() ?? null,
      stateId: formValue.announcementState ?? null,
      startDate: formValue.startDate ?? null,
      endDate: formValue.endDate ?? null,
      file: this.getImageFile()
    };
  }

  /**
   * Resets the announcement form to its initial state.
   * @author dgutierrez
   */
  resetForm() {
    this.form().reset();
  }
}
