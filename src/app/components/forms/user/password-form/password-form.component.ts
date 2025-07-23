import {Component, input} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {FormsService, I18nService} from '@services/general';
import {Constants} from '@common/constants/constants';

@Component({
  selector: 'app-password-form',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class PasswordFormComponent {
  readonly form = input.required<FormGroup>();
  readonly formsService = input.required<FormsService>();
  readonly i18nService = input.required<I18nService>();
}
