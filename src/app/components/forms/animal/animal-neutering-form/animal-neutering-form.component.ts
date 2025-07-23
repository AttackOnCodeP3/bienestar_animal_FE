import {Component, input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {Constants} from '@common/constants/constants';
import {TranslatePipe} from '@ngx-translate/core';
import {FormsService, I18nService} from '@services/general';
import {SanitaryControlResponse} from '@models';
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
    TranslatePipe,
  ],
  templateUrl: './animal-neutering-form.component.html',
  styleUrl: './animal-neutering-form.component.scss',
  providers: [provideNativeDateAdapter()],
  animations: [fade],
  changeDetection: Constants.changeDetectionStrategy
})
export class AnimalNeuteringFormComponent {
  readonly communityAnimalRegistrationFormService = input.required<CommunityAnimalRegistrationFormService>();
  readonly form = input.required<FormGroup>()
  readonly formsService = input.required<FormsService>()
  readonly i18nService = input.required<I18nService>();
  readonly sanitaryControlResponseList = input.required<SanitaryControlResponse[]>()

  get sanitaryControlResponseValueId() {
    return this.form().get('sanitaryControlResponse')?.value?.id
  }
}
