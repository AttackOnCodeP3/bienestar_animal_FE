import {Component, input, output} from '@angular/core';

import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';

import {MaterialFileInputModule} from 'ngx-custom-material-file-input';
import {Editor, NgxEditorComponent, NgxEditorMenuComponent} from 'ngx-editor';

import {GeneralContainerComponent} from '@components/layout';
import {FormsService} from '@services/general';
import {Constants} from '@common/constants/constants';
import {AnnouncementState} from '@models';
import {ComponentModeType} from '@common/types';

/**
 * Component for creating or editing announcements.
 * @author dgutierrez
 */
@Component({
  selector: 'app-announcement-form-component',
  imports: [
    GeneralContainerComponent,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    MaterialFileInputModule,
    NgxEditorComponent,
    NgxEditorMenuComponent,
    ReactiveFormsModule
  ],
  templateUrl: './announcement-form.component.html',
  styleUrl: './announcement-form.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class AnnouncementFormComponent {
  readonly form = input.required<FormGroup>();
  readonly formsService = input.required<FormsService>();
  readonly announcementStatesList = input.required<AnnouncementState[]>()
  readonly editor = input.required<Editor>();
  readonly mode = input.required<ComponentModeType>();
  readonly imageUrl = input<string | null>();

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
