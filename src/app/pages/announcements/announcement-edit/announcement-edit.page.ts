import {Component, computed, effect, inject, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute, Router} from '@angular/router';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatChip} from '@angular/material/chips';
import {Editor} from 'ngx-editor';

import {AlertTypeEnum, PagesUrlsEnum, RouteParamsEnum} from '@common/enums';
import {AnnouncementFormComponent} from '@components/forms/announcement';

import {AnnouncementFormService} from '@services/forms';
import {LoadingModalService, ModalService} from '@services/modals';
import {FileUtilsService} from '@services/utils';
import {AnnouncementHttpService, AnnouncementStateHttpService} from '@services/http';
import {AlertService, FormsService, I18nService} from '@services/general';
import {Constants} from '@common/constants/constants';
import {GeneralContainerComponent} from '@components/layout';

import {UpdateAnnouncementFormDTO} from '@models/dto';

@Component({
  selector: 'app-announcement-edit-page',
  imports: [
    AnnouncementFormComponent,
    GeneralContainerComponent,
    MatButton,
    MatChip,
    MatIcon,
  ],
  providers: [provideNativeDateAdapter(), AnnouncementFormService],
  templateUrl: './announcement-edit.page.html',
  styleUrl: './announcement-edit.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class AnnouncementEditPage implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  readonly announcementHttpService = inject(AnnouncementHttpService);
  readonly formsService = inject(FormsService);
  readonly announcementFormService = inject(AnnouncementFormService);
  readonly announcementStateHttpService = inject(AnnouncementStateHttpService);
  readonly fileUtilsService = inject(FileUtilsService);
  readonly i18nService = inject(I18nService);
  readonly loadingModalService = inject(LoadingModalService);
  readonly alertService = inject(AlertService);
  readonly modalService = inject(ModalService);
  readonly route = inject(ActivatedRoute);

  readonly announcementToUpdate = computed(() => this.announcementHttpService.selectedAnnouncement())

  editor: Editor | undefined;

  /**
   * Effect to synchronize the form with the selected announcement data.
   * It updates the form values when an announcement is selected.
   * @author dgutierrez
   */
  readonly syncFormWithSelectedAnnouncement = effect(() => {
    const announcement = this.announcementHttpService.selectedAnnouncement();
    if (announcement) {
      this.announcementFormService.patchFormWithAnnouncementData(announcement);
    }
  });

  ngOnInit() {
    this.initializePropertiesAsync();
    this.initializeAnnouncementToUpdate();
    this.editor = new Editor();
    this.announcementFormService.isFormUpdate.set(true);
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  /**
   * Handles the form submission for editing an announcement.
   * @author dgutierrez
   */
  onSubmit() {
    const form = this.announcementFormService.form();
    if (form.invalid) {
      this.formsService.markFormTouchedAndDirty(form);
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      })
      this.formsService.logFormErrors(this.announcementFormService.form());
      return;
    }

    this.editAnnouncement();
  }

  /**
   * Submits the form to update an existing announcement.
   * @author dgutierrez
   */
  private editAnnouncement(): void {
    const dto = new UpdateAnnouncementFormDTO(
      this.announcementFormService.getAnnouncementFormValues()
    );

    const announcementId = this.announcementToUpdate()?.id;

    if (!announcementId) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_ID_TO_UPDATE
      });
      this.navigateToAnnouncementsList();
      return;
    }
    this.announcementHttpService.updateAnnouncement(announcementId, dto, {
      showLoading: () => this.loadingModalService.show(),
      hideLoading: () => this.loadingModalService.hide(),
      callback: () => {
        this.announcementFormService.resetForm();
        this.navigateToAnnouncementsList();
      }
    });
  }

  /**
   * Opens a modal to view the selected image.
   * - Uses the uploaded file if present (converted to base64).
   * - Otherwise uses the original image URL from the announcement.
   * - Alerts if no image source is available.
   * @author dgutierrez
   */
  async onViewImage(): Promise<void> {
    const imageFile = this.announcementFormService.getImageFile();
    let imageSource: string | null = null;

    if (imageFile) {
      imageSource = await this.fileUtilsService.convertFileToBase64(imageFile);
    } else {
      imageSource = this.announcementHttpService.selectedAnnouncement()?.imageUrl ?? null;
    }

    if (!imageSource) {
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_NO_FILE_SELECTED
      });
      return;
    }

    this.modalService.openPictureViewerModal({ imageSource });
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
   * Initializes the notification rule to update by fetching its configuration from the server.
   * @author dgutierrez
   */
  private initializeAnnouncementToUpdate(): void {
    const notificationRuleId = Number(this.route.snapshot.paramMap.get(RouteParamsEnum.ANNOUNCEMENT_ID));
    if (!this.validateAnnouncementId(notificationRuleId)) {
      return;
    }
    this.announcementHttpService.getMyMunicipalityAnnouncementById(notificationRuleId)
  }

  /**
   * Validates the announcement ID.
   * If the ID is invalid, it displays an alert and navigates to the list of announcements.
   * @param id The ID of the announcement to validate.
   * @author dgutierrez
   */
  private validateAnnouncementId(id: number | null): boolean {
    if (id === null || isNaN(id) || id <= 0) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_ID_TO_UPDATE
      });
      this.navigateToAnnouncementsList();
      return false;
    }
    return true;
  }

  /**
   * Navigates to the announcements list page.
   * @author dgutierrez
   */
  navigateToAnnouncementsList() {
    this.router.navigate([PagesUrlsEnum.ANNOUNCEMENTS_LIST]);
  }
}
