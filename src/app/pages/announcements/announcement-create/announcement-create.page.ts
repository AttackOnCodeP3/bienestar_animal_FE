import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatInputModule} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {FileInput, MaterialFileInputModule} from 'ngx-custom-material-file-input';
import {
  MatDatepickerModule
} from '@angular/material/datepicker';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';

import {Constants} from '@common/constants/constants';
import {GeneralContainerComponent} from "@components/layout";
import {AlertService, FormsService, I18nService, ModalService} from '@services/general';
import {AnnouncementHttpService, AnnouncementStateHttpService} from '@services/http';
import {notSelectOptionValidator} from '@common/forms';
import {FileUtilsService} from '@services/utils';
import {CreateAnnouncementFormDTO} from '@models/dto';

@Component({
  selector: 'app-announcement-create-page',
  imports: [
    GeneralContainerComponent,
    MatButton,
    MatIcon,
    FormsModule,
    MatError,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    MaterialFileInputModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './announcement-create.page.html',
  styleUrl: './announcement-create.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class AnnouncementCreatePage implements OnInit {
  readonly alertService = inject(AlertService);
  readonly i18nService = inject(I18nService);
  readonly  announcementHttpService = inject(AnnouncementHttpService);
  readonly announcementStateHttpService = inject(AnnouncementStateHttpService);
  readonly formsService = inject(FormsService);
  readonly modalService = inject(ModalService);
  readonly fileUtilsService = inject(FileUtilsService)

  readonly createAnnouncementForm = this.buildCreateAnnouncementForm();

  ngOnInit() {
    this.initializePropertiesAsync();
  }

  /**
   * Initializes properties required for the component.
   * @author dgutierrez
   */
  private initializePropertiesAsync() {
    if (this.announcementStateHttpService.isStatesEmpty()) {
      this.announcementStateHttpService.getAll();
    }
  }

  onSubmit() {
    if (this.createAnnouncementForm.invalid) {
      this.formsService.markFormTouchedAndDirty(this.createAnnouncementForm);
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      })
      return;
    }

    this.registerAnnouncement();
  }

  registerAnnouncement() {
    const dto = this.buildCreateAnnouncementDto();
    this.announcementHttpService.createAnnouncement(dto)
  }

  async onViewImage() {
    const imageFile = this.getImageFile();
    if (!imageFile) {
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_NO_FILE_SELECTED
      });
      return;
    }
    this.modalService.openPictureViewerModal({imageSource: await this.fileUtilsService.convertFileToBase64(imageFile) ?? ''});
  }

  /**
   * Builds the DTO for creating an announcement from the form values.
   * @author dgutierrez
   */
  private buildCreateAnnouncementDto(): CreateAnnouncementFormDTO {
    const {
      title,
      description,
      announcementState,
      startDate,
      endDate
    } = this.createAnnouncementForm.getRawValue();

    return new CreateAnnouncementFormDTO({
      title,
      description,
      stateId: announcementState,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      file: this.getImageFile()
    });
  }

  /**
   * Retrieves the image file from the form.
   * @author dgutierrez
   */
  private getImageFile() {
    const {file} = this.createAnnouncementForm.getRawValue();
    if (!file || !file.files || file.files.length === 0) {
      return null;
    }
    return file.files[0];
  }

  /**
   * Submits the form to create a new announcement.
   * @author dgutierrez
   */
  private buildCreateAnnouncementForm() {
    return this.formsService.formsBuilder.group({
      title: this.formsService.formsBuilder.control('', [Validators.required]),
      description: this.formsService.formsBuilder.control('', [Validators.required]),
      announcementState: this.formsService.formsBuilder.control<number>(this.formsService.filterOptionEnum.SELECT_OPTION, [Validators.required, notSelectOptionValidator]),
      startDate: this.formsService.formsBuilder.control<Date | null>(null, [Validators.required]),
      endDate: this.formsService.formsBuilder.control<Date | null>(null, [Validators.required]),
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
  }
}
