import {Component, computed, effect, input, output} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {ComplaintType} from '@models';
import {GeneralContainerComponent} from '@components/layout';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatHint, MatOption, MatSelect, MatSuffix} from '@angular/material/select';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsService} from '@services/general';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MaterialFileInputModule} from 'ngx-custom-material-file-input';
import {ComponentModeType} from '@common/types';
import {ComplaintStateDTO} from '@models/dto';
import {ComplaintStateIdEnum} from '@common/enums';
import {AuthHttpService} from '@services/http';

/**
 * Component for creating or editing complaints.
 * @author dgutierrez
 */
@Component({
  selector: 'app-complaint-form-component',
  imports: [
    GeneralContainerComponent,
    MatError,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatIcon,
    MatTooltip,
    MatInput,
    MatButton,
    MatHint,
    MatSuffix,
    MaterialFileInputModule
  ],
  templateUrl: './complaint-form.component.html',
  styleUrl: './complaint-form.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ComplaintFormComponent {
  readonly complaintTypesList = input.required<ComplaintType[]>();
  readonly formsService = input.required<FormsService>();
  readonly form = input.required<FormGroup>();
  readonly imageUrl = input<string | null>();
  readonly mode = input<ComponentModeType>('create');
  readonly isEditMode = computed(() => this.mode() === 'edit');
  readonly complaintStateDTO = input<ComplaintStateDTO | null | undefined>();
  readonly showObservations = computed(() => {
    const complaintStateId = this.complaintStateDTO()?.id;
    const complaintStateIdEnum = this.complaintStateIdEnum();
    return complaintStateId === complaintStateIdEnum.WITH_OBSERVATIONS || this.authHttpService().isMunicipalityAdmin();
  });
  readonly complaintStateIdEnum = input.required<typeof ComplaintStateIdEnum>();
  readonly authHttpService = input.required<AuthHttpService>();

  readonly updateComplaintChange = output<void>();
  readonly cancelComplaintChange = output<void>();
  readonly resubmitComplaintChange = output<void>();
  readonly withObservationsComplaintChange = output<void>();
  readonly approveComplaintChange = output<void>();
  readonly completeComplaintChange = output<void>();
  readonly closeComplaintChange = output<void>();

  readonly onViewImageChange = output<void>();
  readonly onSubmitChange = output<void>();
  readonly onCancelByAdminChange = output<void>();
  readonly onCloseByAdminChange = output<void>();

  /**
   * Effect to change the readonly state of form inputs based on the complaint state and user role.
   * @author dgutierrez
   */
  readonly changeReadonlyInputsWhenStateEffect = effect(() => {
    // Es necesario tambien estar atento a los cambios del form porque ah se puede saber si ya esta disponible
    // para proceder con la desactivacion de los controles
    const form = this.form();
    if (!form) return;
    const complaintStateId = this.complaintStateDTO()?.id;
    const complaintStateIdEnum = this.complaintStateIdEnum();
    if (complaintStateId === complaintStateIdEnum.CANCELLED || complaintStateId === complaintStateIdEnum.CLOSED) {
      this.disableAllControls();
    }

    if (this.isEditMode()){
      if (this.authHttpService().isMunicipalityAdmin()) {
        if (
          complaintStateId === complaintStateIdEnum.OPEN ||
          complaintStateId === complaintStateIdEnum.WITH_OBSERVATIONS) {
          this.disableAllControls(['observations']);
        }

        if (complaintStateId === complaintStateIdEnum.APPROVED || complaintStateId === complaintStateIdEnum.COMPLETED) {
          this.disableAllControls();
        }
      }

      if (this.authHttpService().isCommunityUser()) {
        if (complaintStateId === complaintStateIdEnum.WITH_OBSERVATIONS) {
          this.disableObservationsControl();
          return
        }
      }
    }
  })

  get showButtonSeeImage(): boolean {
    const fileControl = this.form().get('file')
    return !!this.imageUrl() && this.imageUrl()?.trim() !== '' || fileControl?.value;
  }

  /**
   * Method to handle the image view action.
   * @author dgutierrez
   */
  onViewImage(): void {
    this.onViewImageChange.emit();
  }

  /**
   * Method to handle the form submission.
   * @author dgutierrez
   */
  onSubmit(): void {
    this.onSubmitChange.emit();
  }

  /**
   * Method to handle the cancel action.
   * @author dgutierrez
   */
  onCancel(): void {
    this.cancelComplaintChange.emit();
  }

  /**
   * Method to handle the update action.
   * @author dgutierrez
   */
  onUpdate(): void {
    this.updateComplaintChange.emit();
  }

  /**
   * Method to handle the resubmit action.
   * @author dgutierrez
   */
  onResubmit(): void {
    this.resubmitComplaintChange.emit();
  }

  /**
   * Method to handle the with observations action.
   * @author dgutierrez
   */
  onWithObservations(): void {
    this.withObservationsComplaintChange.emit();
  }

  /**
   * Method to handle the approve action.
   * @author dgutierrez
   */
  onApprove(): void {
    this.approveComplaintChange.emit();
  }

  /**
   * Method to handle the complete action.
   * @author dgutierrez
   */
  onComplete(): void {
    this.completeComplaintChange.emit();
  }

  /**
   * Method to handle the close action.
   * @author dgutierrez
   */
  onClose(): void {
    this.closeComplaintChange.emit();
  }

  /**
   * Method to handle the cancel by admin action.
   * @author dgutierrez
   */
  onCancelByAdmin(): void {
    this.onCancelByAdminChange.emit();
  }

  /**
   * Method to handle the close by admin action.
   * @author dgutierrez
   */
  onCloseByAdmin(): void {
    this.onCloseByAdminChange.emit();
  }

  /**
   * @author dgutierrez
   */
  private disableAllControls(listControlsToExcept: string[] = []): void {
    const form = this.form();
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && !listControlsToExcept.includes(key)) {
        control.disable();
      }
    });
  }

  /**
   * @author dgutierrez
   */
  private disableObservationsControl(): void {
    const observationsControl = this.form().get('observations');
    if (observationsControl) {
      observationsControl.disable();
    }
  }
}
