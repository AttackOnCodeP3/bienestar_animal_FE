import {Component, input} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FormsService} from '@services/general';
import {SanitaryControlResponse} from '@models';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {SanitaryControlResponseEnum} from '@common/enums';
import {provideNativeDateAdapter} from '@angular/material/core';
import {CommunityAnimalRegistrationFormService} from '@services/forms';
import {fade} from '@animations/fade';

@Component({
  selector: 'app-animal-neutering-form',
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
    ReactiveFormsModule,
  ],
  templateUrl: './animal-neutering-form.component.html',
  styleUrl: './animal-neutering-form.component.scss',
  providers: [provideNativeDateAdapter()],
  animations: [fade],
  changeDetection: Constants.changeDetectionStrategy
})
export class AnimalNeuteringFormComponent {
  readonly form = input.required<FormGroup>()
  readonly formsService = input.required<FormsService>()
  readonly sanitaryControlResponseList = input.required<SanitaryControlResponse[]>()
  readonly communityAnimalRegistrationFormService = input.required<CommunityAnimalRegistrationFormService>();

  get sanitaryControlResponseValueId() {
    return this.form().get('sanitaryControlResponse')?.value?.id
  }
}
