import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MaterialFileInputModule} from 'ngx-custom-material-file-input';
import {
  MatDatepickerModule
} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';

import {Constants} from '@common/constants/constants';
import {GeneralContainerComponent} from "@components/layout";
import {AlertService, FormsService, I18nService} from '@services/general';
import {AnnouncementHttpService, AnnouncementStateHttpService} from '@services/http';
import {FileUtilsService} from '@services/utils';
import {CreateAnnouncementFormDTO} from '@models/dto';
import {LoadingModalService, ModalService} from '@services/modals';
import {Editor} from 'ngx-editor';
import {Router} from '@angular/router';
import {PagesUrlsEnum} from '@common/enums';
import {AnnouncementFormComponent} from '@components/forms/announcement';
import {AnnouncementFormService} from '@services/forms';

@Component({
  selector: 'app-announcement-create-page',
  imports: [
    FormsModule,
    GeneralContainerComponent,
    MatButton,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIcon,
    MatInputModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    AnnouncementFormComponent,
  ],
  providers: [provideNativeDateAdapter(), AnnouncementFormService],
  templateUrl: './announcement-create.page.html',
  styleUrl: './announcement-create.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class AnnouncementCreatePage implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  readonly announcementHttpService = inject(AnnouncementHttpService);
  readonly alertService = inject(AlertService);
  readonly announcementStateHttpService = inject(AnnouncementStateHttpService);
  readonly fileUtilsService = inject(FileUtilsService);
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);
  readonly loadingModalService = inject(LoadingModalService);
  readonly modalService = inject(ModalService);
  readonly announcementFormService = inject(AnnouncementFormService);

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
    if (this.announcementFormService.form().invalid) {
      this.formsService.markFormTouchedAndDirty(this.announcementFormService.form());
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
    this.announcementFormService.form().reset();
    this.navigateToAnnouncementsList();
  }

  /**
   * Opens a modal to view the selected image.
   * @author dgutierrez
   */
  async onViewImage() {
    const imageFile = this.announcementFormService.getImageFile();
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
    } = this.announcementFormService.form().getRawValue();

    return new CreateAnnouncementFormDTO({
      title,
      description,
      stateId: announcementState,
      startDate: startDate ? startDate : null,
      endDate: endDate ? endDate : null,
      file: this.announcementFormService.getImageFile()
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
