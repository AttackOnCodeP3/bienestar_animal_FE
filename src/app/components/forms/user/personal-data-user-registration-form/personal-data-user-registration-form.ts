import {Component, input} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

import {provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatError, MatFormField, MatInput, MatInputModule, MatLabel} from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';

import {Constants} from '@common/constants/constants';
import {Forms, I18n} from '@services/general';

@Component({
  selector: 'app-personal-data-user-registration-form',
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    TranslatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  templateUrl: './personal-data-user-registration-form.html',
  styleUrl: './personal-data-user-registration-form.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: Constants.changeDetectionStrategy
})
export class PersonalDataUserRegistrationForm {
    readonly form = input.required<FormGroup>();
    readonly forms = input.required<Forms>();
    readonly i18n = input.required<I18n>();
}
