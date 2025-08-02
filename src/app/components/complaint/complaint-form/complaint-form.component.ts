import {Component, inject, input} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {ComplaintType} from '@models';
import {GeneralContainerComponent} from '@components/layout';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatError, MatFormField, MatLabel} from '@angular/material/input';
import {FormsService} from '@services/general';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {JsonPipe} from '@angular/common';

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
    JsonPipe
  ],
  templateUrl: './complaint-form.component.html',
  styleUrl: './complaint-form.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ComplaintFormComponent {
  readonly complaintTypesList = input.required<ComplaintType[]>();
  readonly formsService = input.required<FormsService>();
  readonly form = input.required<FormGroup>();
}
