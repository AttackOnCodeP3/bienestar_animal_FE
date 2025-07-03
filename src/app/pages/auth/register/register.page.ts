import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton} from '@angular/material/button';
import {
  InterestsFormComponent,
  ItWorkedAsNurseryHomeFormComponent,
  LocationFormComponent,
  PasswordFormComponent,
  PersonalDataUserRegistrationFormComponent,
  VolunteerOptionFormComponent
} from '@components/forms/user';
import {LogoBienestarAnimalComponent} from '@components/icons';
import {Constants} from '@common/constants/constants';
import {AlertService, FormsService, I18nService} from '@services/general';
import {AlertTypeEnum, PagesUrlsEnum} from '@common/enums';
import {MatDivider} from '@angular/material/divider';
import {
  AuthHttpService,
  CantonHttpService,
  DistrictHttpService,
  InterestHttpService,
  MunicipalityHttpService
} from '@services/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {matchFieldsValidations} from '@common/forms';
import {I18nPagesValidationsEnum} from '@common/enums/i18n';
import {Canton, District, Interest, Municipality, Neighborhood, User} from '@models';
import {RegisterUserRequestDTO} from '@models/dto';

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
    ItWorkedAsNurseryHomeFormComponent,
    MatDivider,
    InterestsFormComponent,
    LocationFormComponent,
    PasswordFormComponent,
    VolunteerOptionFormComponent
  ],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class RegisterPage implements OnInit {
  private readonly alertService = inject(AlertService);
  private readonly authService = inject(AuthHttpService);
  readonly cantonHttpService = inject(CantonHttpService);
  readonly districtHttpService = inject(DistrictHttpService);
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);
  readonly interestHttpService = inject(InterestHttpService);
  readonly municipalityHttpService = inject(MunicipalityHttpService);
  readonly router = inject(Router);

  readonly volunteerIntent = signal(false);

  formPersonalDataUser = this.formsService.formsBuilder.group({
    identificationCard: new FormControl('117260915', [Validators.required]),
    name: new FormControl('David', [Validators.required]),
    lastname: new FormControl('Gutierrez', [Validators.required]),
    email: new FormControl('ddgutierrezc@gmail.com', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('86779876', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    isNurseryHome: new FormControl(false, [Validators.required]),
    interests: new FormControl<Interest[]>([]),
    canton: new FormControl<Canton | null>(null, [Validators.required]),
    district: new FormControl<District | null>(null, [Validators.required]),
    neighborhood: new FormControl<Neighborhood | null>(null, [Validators.required]),
    password: new FormControl('Heliosnxp1516', [Validators.required]),
    confirmPassword: new FormControl('Heliosnxp1516', [Validators.required]),
    volunteerMunicipality: new FormControl<Municipality | null>(null, [Validators.required]),
  }, {
    validators: matchFieldsValidations('password', 'confirmPassword'),
  });

  readonly isNurseryHome = toSignal(this.formPersonalDataUser.controls.isNurseryHome?.valueChanges, {initialValue: this.formPersonalDataUser.controls.isNurseryHome?.value});

  private readonly enableDisableVolunteerMunicipalityEffect = effect(() => {
    this.enableDisableVolunteerMunicipality(this.volunteerIntent());
  });

  ngOnInit() {
    this.interestHttpService.getAll();
    this.municipalityHttpService.getAll();
    this.cantonHttpService.getAll();
  }

  /**
   * Handles the form submission for user registration.
   * Validates the form and if valid, calls the registerUser method to register the user.
   * If the form is invalid, it marks the form as touched and dirty to show validation errors.
   * @author dgutierrez
   */
  onSubmit() {
    if (this.formPersonalDataUser.invalid) {
      this.formsService.markFormTouchedAndDirty(this.formPersonalDataUser);
      this.alertService.displayAlert({
        messageKey: I18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      })
      return;
    }

    this.registerUser();
  }

  /**
   * Registers a new user with the provided personal data.
   * It retrieves the form values, constructs a User object, and calls the authService to register the user.
   * If successful, it navigates to the login page; otherwise, it shows an error message.
   * @author dgutierrez
   */
  private registerUser() {
    const {confirmPassword, volunteerMunicipality, ...rest} = this.formPersonalDataUser.getRawValue();
    const registerUserRequestDTO = RegisterUserRequestDTO.fromUser(new User({
      ...rest, municipality: new Municipality({
        id: volunteerMunicipality?.id
      })
    }), this.volunteerIntent());
    this.authService.registerUser(registerUserRequestDTO).subscribe({
      next: () => {
        this.alertService.displayAlert({
          messageKey: I18nPagesValidationsEnum.REGISTER_PAGE_REGISTERED_SUCCESSFULLY,
          type: AlertTypeEnum.SUCCESS
        })
        this.navigateToLogin();
      },
      error: (error) => {
        this.alertService.displayAlert({message: error.error.description})
      }
    });
  }

  /**
   * Handles the change event of the canton selection.
   * @param interests - The selected interests.
   * @author dgutierrez
   */
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

  /**
   * Enables or disables the volunteer municipality field based on the intent.
   * @param intent - A boolean indicating whether the user intends to volunteer.
   * @author dgutierrez
   */
  private enableDisableVolunteerMunicipality(intent: boolean) {
    const control = this.formPersonalDataUser.get('volunteerMunicipality');

    if (!control) return;

    if (intent) {
      control.enable();
    } else {
      control.disable();
      control.setValue(null);
    }
  }

  /**
   * Navigates to the login page.
   * @author dgutierrez
   */
  navigateToLogin() {
    this.router.navigate([PagesUrlsEnum.LOGIN])
  }
}
