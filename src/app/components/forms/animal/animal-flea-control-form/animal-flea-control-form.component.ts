import {Component, input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {provideNativeDateAdapter} from '@angular/material/core';
import {Constants} from '@common/constants/constants';
import {FormsService} from '@services/general';
import {SanitaryControlResponse} from '@models';
import {SanitaryControlResponseEnum} from '@common/enums';
import {CommunityAnimalRegistrationFormService} from '@services/forms';
import {fade} from '@animations/fade';

@Component({
  selector: 'app-animal-flea-control-form',
  imports: [
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatRadioButton,
    MatRadioGroup,
    MatSuffix,
    ReactiveFormsModule
  ],
  templateUrl: './animal-flea-control-form.component.html',
  styleUrl: './animal-flea-control-form.component.scss',
  providers: [provideNativeDateAdapter()],
  animations: [fade],
  changeDetection: Constants.changeDetectionStrategy
})
export class AnimalFleaControlFormComponent {
  readonly form = input.required<FormGroup>()
  readonly formsService = input.required<FormsService>()
  readonly sanitaryControlResponseList = input.required<SanitaryControlResponse[]>()
  readonly communityAnimalRegistrationFormService = input.required<CommunityAnimalRegistrationFormService>();

  get sanitaryControlResponseValueId() {
    return this.form().get('sanitaryControlResponse')?.value?.id
  }
}
