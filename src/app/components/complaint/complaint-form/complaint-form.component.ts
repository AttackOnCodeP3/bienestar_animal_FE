import {Component, input} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {ComplaintType} from '@models';
import {GeneralContainerComponent} from '@components/layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatError, MatFormField, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-complaint-form-component',
  imports: [
    GeneralContainerComponent,
    MatError,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ],
  templateUrl: './complaint-form.component.html',
  styleUrl: './complaint-form.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ComplaintFormComponent {
  readonly complaintTypesList = input.required<ComplaintType[]>();
}
