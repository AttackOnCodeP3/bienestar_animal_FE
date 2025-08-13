import {Component, input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatError} from '@angular/material/input';
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
    MatError,
    MatRadioButton,
    MatRadioGroup,
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
}
