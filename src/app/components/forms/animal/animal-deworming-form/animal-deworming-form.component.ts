import {Component, input} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatError, MatFormField} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {SanitaryControlResponseEnum} from '@common/enums';
import {FormsService, I18nService} from '@services/general';
import {Constants} from '@common/constants/constants';
import {SanitaryControlResponse} from '@models';
import {CommunityAnimalRegistrationFormService} from '@services/forms';
import {fade} from '@animations/fade';


@Component({
  selector: 'app-animal-deworming-form',
  imports: [
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton,
    MatFormField,
    MatError,
    MatInputModule,
    MatDatepickerModule
  ],
  templateUrl: './animal-deworming-form.component.html',
  styleUrl: './animal-deworming-form.component.scss',
  providers: [provideNativeDateAdapter()],
  animations: [fade],
  changeDetection: Constants.changeDetectionStrategy
})
export class AnimalDewormingFormComponent {
  readonly communityAnimalRegistrationFormService = input.required<CommunityAnimalRegistrationFormService>();
  readonly form = input.required<FormGroup>();
  readonly formsService = input.required<FormsService>();
  readonly i18nService = input.required<I18nService>();
  readonly sanitaryControlResponseList = input.required<SanitaryControlResponse[]>();

  get sanitaryControlResponseValueId() {
    return this.form().get('sanitaryControlResponse')?.value?.id
  }
}
