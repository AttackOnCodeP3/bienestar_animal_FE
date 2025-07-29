import {Component, inject, OnDestroy, OnInit} from '@angular/core';
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
import {AlertService, FormsService, I18nService} from '@services/general';
import {AnnouncementHttpService, AnnouncementStateHttpService} from '@services/http';
import {notSelectOptionValidator} from '@common/forms';
import {FileUtilsService} from '@services/utils';
import {CreateAnnouncementFormDTO} from '@models/dto';
import {LoadingModalService, ModalService} from '@services/modals';
import {Editor, NgxEditorComponent, NgxEditorMenuComponent} from 'ngx-editor';
import {Router} from '@angular/router';
import {PagesUrlsEnum} from '@common/enums';

@Component({
  selector: 'app-announcement-create-page',
  imports: [
    FormsModule,
    GeneralContainerComponent,
    MatButton,
    MatDatepickerModule,
    MatError,
    MatFormFieldModule,
    MatIcon,
    MatInputModule,
    MatOption,
    MatSelect,
    MaterialFileInputModule,
    NgxEditorComponent,
    NgxEditorMenuComponent,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './announcement-create.page.html',
  styleUrl: './announcement-create.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class AnnouncementCreatePage implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  readonly  announcementHttpService = inject(AnnouncementHttpService);
  readonly alertService = inject(AlertService);
  readonly announcementStateHttpService = inject(AnnouncementStateHttpService);
  readonly fileUtilsService = inject(FileUtilsService)
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);
  readonly loadingModalService = inject(LoadingModalService)
  readonly modalService = inject(ModalService);

  readonly createAnnouncementForm = this.buildCreateAnnouncementForm();

  editor: Editor | undefined;

  ngOnInit() {
    this.editor = new Editor();
    this.initializePropertiesAsync();
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
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

  /**
   * Handles the form submission for creating an announcement.
   * @author dgutierrez
   */
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

  /**
   * Registers a new announcement by sending the form data to the server.
   * @author dgutierrez
   */
  registerAnnouncement() {
    const dto = this.buildCreateAnnouncementDto();
    this.announcementHttpService.createAnnouncement(dto, {
      showLoading: () => this.loadingModalService.show(),
      hideLoading: () => this.loadingModalService.hide(),
      callback: () => this.onAfterCreateAnnouncement()
    })
  }

  /**
   * Callback executed after a new announcement is successfully created.
   * @author dgutierrez
   */
  private onAfterCreateAnnouncement() {
    this.resetForm();
    this.navigateToAnnouncementsList();
  }

  /**
   * Resets the announcement creation form to its initial state.
   * @author dgutierrez
   */
  private resetForm() {
    this.createAnnouncementForm.reset();
  }

  /**
   * Opens a modal to view the selected image.
   * @author dgutierrez
   */
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
      description: this.formsService.formsBuilder.control(''),
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

  /**
   * Navigates to the announcements list page.
   * @author dgutierrez
   */
  navigateToAnnouncementsList() {
    this.router.navigate([PagesUrlsEnum.ANNOUNCEMENTS_LIST]);
  }
}
