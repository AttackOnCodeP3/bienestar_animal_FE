import {Component, computed, effect, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {GeneralContainerComponent} from '@components/layout';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, FormsService, I18nService, LogService, ValidationsService} from '@services/general';
import {FileUtilsService} from '@services/utils';
import {LoadingModalService, ModalService} from '@services/modals';
import {ComplaintFormService} from '@services/forms';
import {AuthHttpService, ComplaintHttpService, ComplaintTypeHttpService} from '@services/http';
import {ComplaintStateIdEnum, PagesUrlsEnum, RouteParamsEnum} from '@common/enums';
import {MatChip} from '@angular/material/chips';
import {ComplaintFormComponent} from '@components/forms/complaint';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ObservationsDto, UpdateComplaintMultipartDto} from '@models/dto';

/**
 * Page for managing complaints.
 * @author dgutierrez
 */
@Component({
  selector: 'app-complaint-manage-page',
  imports: [
    GeneralContainerComponent,
    MatChip,
    ComplaintFormComponent,
    MatButton,
    MatIcon
  ],
  templateUrl: './complaint-manage.page.html',
  styleUrl: './complaint-manage.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ComplaintManagePage implements OnInit {
  private readonly complaintFormService = inject(ComplaintFormService);
  private readonly complaintHttpService = inject(ComplaintHttpService);
  private readonly loadingModalService = inject(LoadingModalService);
  private readonly logService = inject(LogService);
  private readonly router = inject(Router);
  private readonly validationsService = inject(ValidationsService);
  readonly alertService = inject(AlertService);
  readonly authHttpService = inject(AuthHttpService);
  readonly complaintTypeHttpService = inject(ComplaintTypeHttpService);
  readonly fileUtilsService = inject(FileUtilsService);
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);
  readonly modalService = inject(ModalService);
  readonly route = inject(ActivatedRoute);

  readonly complaintForm = this.complaintFormService.buildComplaintForm({isEditMode: true});
  readonly complaintToManage = computed(() => this.complaintHttpService.selectedComplaint());

  readonly syncFormWithSelectedComplaint = effect(() => {
    const complaint = this.complaintHttpService.selectedComplaint();
    if (complaint) {
      this.complaintFormService.patchFormWithComplaintData(this.complaintForm, complaint);
    }
  });

  get complaintStateIdEnum() {
    return ComplaintStateIdEnum
  }

  ngOnInit() {
    this.initializePropertiesAsync();
  }

  /**
   * Aprobar (ADMIN, estado OPEN)
   * PUT /complaints/{id}/approve
   * @author dg
   */
  onApproveComplaint(): void {
    const id = this.getComplaintId();
    this.complaintHttpService.approveComplaint({
      id,
      handlers: {
        ...this.loadingModalService.httpHandlersLoading,
        callback: () => this.onAfterTerminalAction()
      }
    });
  }

  /**
   * Cancelar (COMUNITARIO, estado OPEN)
   * PUT /complaints/{id}/cancel
   * @author dg
   */
  onCancelComplaint(): void {
    const id = this.getComplaintId();
    this.complaintHttpService.cancelComplaint({
      id,
      handlers: {
        ...this.loadingModalService.httpHandlersLoading,
        callback: () => this.onAfterTerminalAction()
      }
    });
  }

  /**
   * Actualizar y reenviar (COMUNITARIO, estado WITH_OBSERVATIONS)
   * PUT /complaints/{id} (el backend la pasa a OPEN y limpia observaciones)
   * @author dg
   */
  onResubmitComplaint(): void {
    const id = this.getComplaintId();
    const dto = this.buildUpdateDtoFromForm();
    this.complaintHttpService.updateComplaint({
      id,
      dto,
      handlers: {
        ...this.loadingModalService.httpHandlersLoading,
        callback: () => this.onAfterTerminalAction()
      }
    });
  }

  /**
   * Con observaciones (ADMIN, estados OPEN o WITH_OBSERVATIONS)
   * PUT /complaints/{id}/observe
   * @author dg
   */
  onWithObservationsComplaint(): void {
    const id = this.getComplaintId();
    const {observations} = this.complaintForm.getRawValue();

    if (!this.validationsService.isStringDefined(observations)) {
      this.alertService.displayAlert({
        message: "Debe ingresar observaciones antes de continuar.",
      });
      return;
    }

    const dto: ObservationsDto = { observations: observations ?? '' };

    this.complaintHttpService.observeComplaint({
      id,
      dto,
      handlers: {
        ...this.loadingModalService.httpHandlersLoading,
        callback: () => this.onAfterTerminalAction()
      }
    });
  }

  /**
   * Cerrar (ADMIN, estados COMPLETED o WITH_OBSERVATIONS)
   * PUT /complaints/{id}/close
   * @author dgutierrez
   */
  onCloseComplaint(): void {
    const id = this.getComplaintId();
    this.complaintHttpService.closeComplaint({
      id,
      handlers: {
        ...this.loadingModalService.httpHandlersLoading,
        callback: () => this.onAfterTerminalAction()
      }
    });
  }

  /**
   * Completar (ADMIN, estado APPROVED)
   * PUT /complaints/{id}/complete
   * @author dgutierrez
   */
  onCompleteComplaint(): void {
    const id = this.getComplaintId();
    this.complaintHttpService.completeComplaint({
      id,
      handlers: {
        ...this.loadingModalService.httpHandlersLoading,
        callback: () => this.onAfterTerminalAction()
      }
    });
  }

  /**
   * Actualizar (COMUNITARIO, estado OPEN)
   * PUT /complaints/{id}
   * @author dgutierrez
   */
  onUpdateComplaint(): void {
    const id = this.getComplaintId();
    const dto = this.buildUpdateDtoFromForm();

    this.complaintHttpService.updateComplaint({
      id,
      dto,
      handlers: {
        ...this.loadingModalService.httpHandlersLoading,
        callback: () => this.onAfterTerminalAction()
      }
    });
  }

  /**
   * Construye el UpdateComplaintMultipartDto desde el formulario.
   * @author dgutierrez
   */
  private buildUpdateDtoFromForm(): UpdateComplaintMultipartDto {
    const form = this.complaintForm;
    const {description, complaintType} = form.getRawValue();
    const imageFile = this.complaintFormService.getImageFile(form);

    return new UpdateComplaintMultipartDto({
      description: description ?? null,
      complaintTypeId: complaintType?.id ?? null,
      image: imageFile ?? null,
    });
  }

  /**
   * @author dgutierrez
   */
  private onAfterTerminalAction(): void {
    this.navigateToComplaintList();
  }

  /**
   * @author dgutierrez
   */
  private getComplaintId(): number {
    return this.complaintToManage()?.id!;
  }


  /**
   * Initializes properties and fetches the complaint to manage.
   * This method is called on component initialization.
   * @author dgutierrez
   */
  private initializePropertiesAsync() {
    this.initializeComplaintToManage();
    this.complaintTypeHttpService.getAll();
  }

  /**
   * Initializes the complaint to manage by fetching it based on the ID from the route parameters.
   * Validates the complaint ID and fetches the complaint details accordingly.
   * @author dgutierrez
   */
  private initializeComplaintToManage() {
    const complaintId = Number(this.route.snapshot.paramMap.get(RouteParamsEnum.COMPLAINT_ID));

    if (!this.validateComplaintId(complaintId)) {
      return;
    }

    this.getComplaint(complaintId);
  }

  /**
   * Fetches the complaint by ID based on the user's role.
   * If the user is a community user, it fetches the complaint for community users.
   * If the user is a municipality admin, it fetches the complaint for municipality admins.
   * @param id The ID of the complaint to fetch.
   * @author dgutierrez
   */
  private getComplaint(id: number) {
    if (this.authHttpService.isCommunityUser()) {
      this.complaintHttpService.getComplaintByIdForCommunityUser(id, {
        ...this.loadingModalService.httpHandlersLoading
      });
    } else if (this.authHttpService.isMunicipalityAdmin()) {
      this.complaintHttpService.getComplaintByIdForMunicipalityAdmin(id, {
        ...this.loadingModalService.httpHandlersLoading
      });
    } else {
      this.logService.error({
        message: 'Unauthorized access to complaints list',
        data: this.authHttpService.currentUser(),
        error: new Error('Unauthorized access')
      })
    }
  }

  /**
   * Validates the complaint ID.
   * If the ID is invalid, navigates to the complaints list page.
   * @param complaintId The complaint ID to validate.
   * @returns True if the ID is valid, false otherwise.
   * @author dgutierrez
   */
  private validateComplaintId(complaintId: number | null): boolean {
    if (!this.validationsService.isDefined(complaintId) || isNaN(complaintId) || complaintId <= 0) {
      this.navigateToComplaintList();
      return false;
    }
    return true;
  }

  /**
   * Opens a modal to preview the uploaded image from the form.
   * If no image is selected, displays an alert.
   * @author dgutierrez
   */
  async onViewImage(): Promise<void> {
    const imageFile = this.complaintFormService.getImageFile(this.complaintForm);
    let imageSource: string | null = null;

    if (imageFile) {
      imageSource = await this.fileUtilsService.convertFileToBase64(imageFile);
    } else {
      imageSource = this.complaintToManage()?.imageUrl ?? null;
    }

    if (!imageSource) {
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_NO_FILE_SELECTED
      });
      return;
    }

    this.modalService.openPictureViewerModal({imageSource});
  }

  /**
   * @author dgutierrez
   */
  navigateToComplaintList() {
    this.router.navigate([PagesUrlsEnum.COMPLAINTS_LIST]);
  }
}
