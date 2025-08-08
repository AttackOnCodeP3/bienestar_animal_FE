import {Component, input, output} from '@angular/core';
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

  readonly onViewImageChange = output<void>();
  readonly onSubmitChange = output<void>();

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
}
