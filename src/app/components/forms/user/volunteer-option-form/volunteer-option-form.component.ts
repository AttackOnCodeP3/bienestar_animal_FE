import {Component, input, model} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatError, MatFormField, MatLabel} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';
import {TranslatePipe} from '@ngx-translate/core';
import {Constants} from '@common/constants/constants';
import {FormsService, I18nService} from '@services/general';
import {Municipality} from '@models';
import {fade} from '../../../../common/animations/fade/fade';

@Component({
  selector: 'app-volunteer-option-form',
  imports: [
    FormsModule,
    MatCheckbox,
    TranslatePipe,
    MatError,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './volunteer-option-form.component.html',
  styleUrl: './volunteer-option-form.component.scss',
  animations: [fade],
  changeDetection: Constants.changeDetectionStrategy
})
export class VolunteerOptionFormComponent {
  readonly checked = model<boolean>(false);
  readonly municipalitiesList = input.required<Municipality[]>();
  readonly i18nService = input.required<I18nService>();
  readonly form = input.required<FormGroup>();
  readonly formsService = input.required<FormsService>();
}
