import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton} from '@angular/material/button';
import {ItWorkedAsNurseryHome, PersonalDataUserRegistrationForm} from '@components/forms/user';
import {LogoBienestarAnimal} from '@components/icons';
import {Constants} from '@common/constants/constants';
import {Forms, I18n} from '@services/general';
import {PagesUrlsEnum} from '@common/enums';
import {MatDivider} from '@angular/material/divider';

/**
 * Component for the user registration page.
 * @author dgutierrez
 */
@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    LogoBienestarAnimal,
    ReactiveFormsModule,
    TranslatePipe,
    MatButton,
    PersonalDataUserRegistrationForm,
    ItWorkedAsNurseryHome,
    MatDivider
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class Register {
  readonly forms = inject(Forms);
  readonly i18n = inject(I18n);
  readonly router = inject(Router);

  formPersonalDataUser = this.forms.formsBuilder.group({
    identificationCard: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    isNurseryHome: new FormControl(false, [Validators.required]),
    municipalityId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if(this.formPersonalDataUser.invalid) {
      this.formPersonalDataUser.markAllAsTouched();
      return;
    }
  }

  private registerUser(){

  }

  /**
   * Handles the change event of the "It worked as a nursery home" checkbox.
   * @param checked - The new checked state of the checkbox.
   * @author dgutierrez
   */
  checkedChangeIsNurseryHome(checked: boolean) {
    this.formPersonalDataUser.get('isNurseryHome')?.setValue(checked);
    //updateValueAndValidity
  }

  navigateToLogin() {
    this.router.navigate([PagesUrlsEnum.LOGIN])
  }
}
