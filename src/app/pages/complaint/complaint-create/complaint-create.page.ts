import {Component, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {ComplaintHttpService, ComplaintTypeHttpService} from '@services/http';
import {GeneralContainerComponent} from '@components/layout';
import {AlertService, FormsService, I18nService, LocationService, LogService} from '@services/general';
import {Validators} from '@angular/forms';
import {notSelectOptionValidator} from '@common/forms';
import {ComplaintFormComponent} from '@components/forms/complaint';
import {LoadingModalService, ModalService} from '@services/modals';
import {FileUtilsService} from '@services/utils';
import {FileInput} from 'ngx-custom-material-file-input';
import {CreateComplaintMultipartDto} from '@models/dto';
import {ComplaintType} from '@models';

/**
 * Page for creating a new complaint.
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

  readonly complaintHttpService = inject(ComplaintHttpService)
  readonly complaintTypeHttpService = inject(ComplaintTypeHttpService)
  readonly formsService = inject(FormsService);
  readonly alertService = inject(AlertService);
  readonly i18nService = inject(I18nService);
  private readonly modalService = inject(ModalService);
  private readonly fileUtilsService = inject(FileUtilsService);
  private readonly locationService = inject(LocationService);
  private readonly loadingModalService = inject(LoadingModalService);
  private readonly logService = inject(LogService);

  readonly complaintCreateForm = this.buildCreateComplaintForm();

  async ngOnInit() {
    this.complaintTypeHttpService.getAll();
  }

  /**
   * Handles the form submission for creating a complaint.
   * @author dgutierrez
   */
  onSubmit() {
    if (this.complaintCreateForm.invalid) {
      this.formsService.markFormTouchedAndDirty(this.complaintCreateForm);
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      })
      return;
    }

    this.registerComplaint();
  }

  /**
   * Registers a new complaint.
   * @author dgutierrez
   */
  private async registerComplaint() {
    const dto = await this.buildCreateComplaintDto();

    this.complaintHttpService.createComplaint(dto, {
      showLoading: () => this.loadingModalService.show(),
      hideLoading: () => this.loadingModalService.hide(),
      callback: () => this.onAfterCreateComplaint()
    })
  }

  /**
   * Resets the complaint creation form after a successful complaint creation.
   * @author dgutierrez
   */
  private async onAfterCreateComplaint() {
    this.complaintCreateForm.reset();
  }

  /**
   * Builds the DTO for creating a complaint.
   * @author dgutierrez
   */
  private async buildCreateComplaintDto() {
    let createComplaintMultipartDto = new CreateComplaintMultipartDto();
    await this.loadingModalService.show();
    try {
      const {coordinates} = await this.locationService.getUserLocation();
      const {complaintType, description} = this.complaintCreateForm.getRawValue();

      return new CreateComplaintMultipartDto({
        complaintTypeId: complaintType?.id,
        description: description,
        image: this.getImageFile(),
        latitude: coordinates?.latitude ?? 0,
        longitude: coordinates?.longitude ?? 0,
      })
    } catch (error) {
      this.logService.error({
        message: 'Error getting user location for complaint creation.',
        error: error
      });
    } finally {
      this.loadingModalService.hide();
    }

    return createComplaintMultipartDto;
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
   * Retrieves the image file from the form.
   * @returns The image file if it exists, otherwise null.
   * @author dgutierrez
   */
  private getImageFile() {
    const {file} = this.complaintCreateForm.getRawValue();
    if (!file || !file?.files || file.files.length === 0) {
      return null;
    }
    return file.files[0];
  }

  /**
   * Builds the form for creating a complaint.
   * @returns The form group for creating a complaint.
   * @author dgutierrez
   */
  private buildCreateComplaintForm() {
    const formsBuilder = this.formsService.formsBuilder;
    return formsBuilder.group({
      complaintType: formsBuilder.control<ComplaintType | null>(null, [Validators.required, notSelectOptionValidator]),
      description: formsBuilder.control<string>('', [
        Validators.required,
        Validators.maxLength(1000)
      ]),
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
    })
  }
}
