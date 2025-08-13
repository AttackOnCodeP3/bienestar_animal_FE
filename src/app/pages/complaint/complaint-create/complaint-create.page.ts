import {Component, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {AuthHttpService, ComplaintHttpService, ComplaintTypeHttpService} from '@services/http';
import {GeneralContainerComponent} from '@components/layout';
import {AlertService, FormsService, I18nService, LocationService} from '@services/general';
import {ComplaintFormComponent} from '@components/forms/complaint';
import {LoadingModalService, ModalService} from '@services/modals';
import {FileUtilsService} from '@services/utils';
import {Router} from '@angular/router';
import {ComplaintStateIdEnum, PagesUrlsEnum} from '@common/enums';
import {ComplaintFormService} from '@services/forms';

/**
 * Page component responsible for creating a new complaint.
 * Handles form building, validation, geolocation retrieval,
 * and submission via the ComplaintHttpService.
 *
 * This component delegates form logic to ComplaintFormService to
 * ensure consistency and reusability across both create and edit flows.
 *
 * @author dgutierrez
 */
@Component({
  selector: 'app-complaint-create-page',
  imports: [
    GeneralContainerComponent,
    ComplaintFormComponent,
  ],
  templateUrl: './complaint-create.page.html',
  styleUrl: './complaint-create.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ComplaintCreatePage implements OnInit {

  private readonly alertService = inject(AlertService);
  private readonly complaintFormService = inject(ComplaintFormService);
  private readonly complaintHttpService = inject(ComplaintHttpService);
  private readonly fileUtilsService = inject(FileUtilsService);
  private readonly i18nService = inject(I18nService);
  private readonly loadingModalService = inject(LoadingModalService);
  private readonly locationService = inject(LocationService);
  private readonly modalService = inject(ModalService);
  private readonly router = inject(Router);
  readonly authHttpService = inject(AuthHttpService);
  readonly complaintTypeHttpService = inject(ComplaintTypeHttpService);
  readonly formsService = inject(FormsService);

  readonly complaintCreateForm = this.complaintFormService.buildComplaintForm();

  get complaintStateIdEnum() {
    return ComplaintStateIdEnum
  }

  async ngOnInit(): Promise<void> {
    this.complaintTypeHttpService.getAll();
  }

  /**
   * Handles the form submission.
   * If the form is invalid, displays an alert and highlights the errors.
   * Otherwise, triggers the complaint creation process.
   * @author dgutierrez
   */
  async onSubmit(): Promise<void> {
    const confirmAction = await this.modalService.openConfirmActionModal({
      title: "Confirmar envío",
      message: "¿Estás seguro de que deseas enviar esta denuncia?",
    })

    if (!confirmAction?.isConfirmed) return;

    if (this.complaintCreateForm.invalid) {
      this.formsService.markFormTouchedAndDirty(this.complaintCreateForm);
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      });
      return;
    }

    this.registerComplaint();
  }

  /**
   * Registers a new complaint by building the DTO
   * with user location and form values.
   * Submits the complaint via the HTTP service.
   * @author dgutierrez
   */
  private async registerComplaint(): Promise<void> {
    const {coordinates} = await this.locationService.getUserLocation();
    const dto = this.complaintFormService.buildComplaintDtoFromForm(this.complaintCreateForm, coordinates);

    this.complaintHttpService.createComplaint({
      dto,
      handlers: {
        ...this.loadingModalService.httpHandlersLoading,
        callback: () => this.onAfterCreateComplaint()
      }
    });
  }

  /**
   * Called after successful complaint creation.
   * Resets the form and navigates back to the complaint list.
   * @author dgutierrez
   */
  private onAfterCreateComplaint(): void {
    this.complaintCreateForm.reset();
    this.navigateToComplaintList();
  }

  /**
   * Opens a modal to preview the uploaded image from the form.
   * If no image is selected, displays an alert.
   * @author dgutierrez
   */
  async onViewImage(): Promise<void> {
    const imageFile = this.complaintFormService.getImageFile(this.complaintCreateForm);
    if (!imageFile) {
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_NO_FILE_SELECTED
      });
      return;
    }

    const base64 = await this.fileUtilsService.convertFileToBase64(imageFile);
    this.modalService.openPictureViewerModal({imageSource: base64 ?? ''});
  }

  /**
   * Navigates the user back to the list of complaints.
   * @author dgutierrez
   */
  private navigateToComplaintList(): void {
    this.router.navigate([PagesUrlsEnum.COMPLAINTS_LIST]);
  }
}
