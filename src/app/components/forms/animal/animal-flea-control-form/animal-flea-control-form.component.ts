import {Component, input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {provideNativeDateAdapter} from '@angular/material/core';
import {TranslatePipe} from '@ngx-translate/core';
import {fade} from '@animations/fade';
import {Constants} from '@common/constants/constants';
import {SanitaryControlResponse} from '@models';
import {CommunityAnimalRegistrationFormService} from '@services/forms';
import {FormsService, I18nService} from '@services/general';

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
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './animal-flea-control-form.component.html',
  styleUrl: './animal-flea-control-form.component.scss',
  providers: [provideNativeDateAdapter()],
  animations: [fade],
  changeDetection: Constants.changeDetectionStrategy
})
export class AnimalFleaControlFormComponent {
  readonly communityAnimalRegistrationFormService = input.required<CommunityAnimalRegistrationFormService>();
  readonly form = input.required<FormGroup>()
  readonly formsService = input.required<FormsService>()
  readonly i18nService = input.required<I18nService>();
  readonly sanitaryControlResponseList = input.required<SanitaryControlResponse[]>()

  get sanitaryControlResponseValueId() {
    return this.form().get('sanitaryControlResponse')?.value?.id
  }
}
