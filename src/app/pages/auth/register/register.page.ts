import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton} from '@angular/material/button';
import {
  InterestsComponent,
  ItWorkedAsNurseryHomeComponent,
  PersonalDataUserRegistrationFormComponent
} from '@components/forms/user';
import {LogoBienestarAnimalComponent} from '@components/icons';
import {Constants} from '@common/constants/constants';
import {FormsService, I18nService} from '@services/general';
import {PagesUrlsEnum} from '@common/enums';
import {MatDivider} from '@angular/material/divider';
import {AuthHttpService, InterestHttpService, MunicipalityHttpService} from '@services/http';
import {JsonPipe} from '@angular/common';
import {Interest, User} from '@models';
import {toSignal} from '@angular/core/rxjs-interop';
import {matchFieldsValidations} from '@common/forms';

/**
 * Component for the user registration page.
 * @author dgutierrez
 */
@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    LogoBienestarAnimalComponent,
    ReactiveFormsModule,
    TranslatePipe,
    MatButton,
    PersonalDataUserRegistrationFormComponent,
    ItWorkedAsNurseryHomeComponent,
    MatDivider,
    JsonPipe,
    InterestsComponent
  ],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class RegisterPage implements OnInit {
  private readonly authService = inject(AuthHttpService);
  private readonly municipalityHttpService = inject(MunicipalityHttpService);
  readonly interestHttpService = inject(InterestHttpService);
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);
  readonly router = inject(Router);

  formPersonalDataUser = this.formsService.formsBuilder.group({
    identificationCard: new FormControl('117260915', [Validators.required]),
    name: new FormControl('David', [Validators.required]),
    lastname: new FormControl('Gutierrez', [Validators.required]),
    email: new FormControl('wwwdcalderon@gmail.com', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('81719081', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    isNurseryHome: new FormControl(false, [Validators.required]),
    interests: new FormControl<Interest[]>([]),
    password: new FormControl('Heliosnxp1516', [Validators.required]),
    confirmPassword: new FormControl('Heliosnxp1516', [Validators.required]),
  }, {
    validators: matchFieldsValidations('password', 'confirmPassword'),
  });

  readonly isNurseryHome = toSignal(this.formPersonalDataUser.controls.isNurseryHome?.valueChanges, {initialValue: this.formPersonalDataUser.controls.isNurseryHome?.value});

  ngOnInit() {
    this.interestHttpService.getAll();
    this.municipalityHttpService.getAll();
  }

  onSubmit() {
    if (this.formPersonalDataUser.invalid) {
      this.formsService.markFormTouchedAndDirty(this.formPersonalDataUser);
      return;
    }

    this.registerUser();
  }

  private registerUser() {
    const {confirmPassword, ...rest} = this.formPersonalDataUser.getRawValue();
    const user = new User(rest);
    this.authService.registerUser(user).subscribe({
      next: () => {
        console.log('User registered successfully');
        /*this.i18nService.showSuccessMessage('auth.register.success');*/
        this.navigateToLogin();
      },
      error: (error) => {
        debugger
        console.error('Error registering user:', error);
        /*this.i18nService.showErrorMessage('auth.register.error', error);*/
      }
    });
  }

  interestsChange(interests: Interest[]) {
    this.formPersonalDataUser.get('interests')?.setValue(interests);
  }

  /**
   * Handles the change event of the "It worked as a nursery home" checkbox.
   * @param checked - The new checked state of the checkbox.
   * @author dgutierrez
   */
  checkedChangeIsNurseryHome(checked: boolean) {
    this.formPersonalDataUser.get('isNurseryHome')?.setValue(checked);
  }

  navigateToLogin() {
    this.router.navigate([PagesUrlsEnum.LOGIN])
  }
}
