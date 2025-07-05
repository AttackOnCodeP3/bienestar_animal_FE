import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {Constants} from '@common/constants/constants';
import {AlertService, FormsService, I18nService} from '@services/general';
import {AlertTypeEnum, PagesUrlsEnum} from '@common/enums';
import {
  AuthHttpService,
  CantonHttpService,
  DistrictHttpService,
  InterestHttpService,
  MunicipalityHttpService
} from '@services/http';
import {I18nPagesValidationsEnum} from '@common/enums/i18n';
import {Municipality, User} from '@models';
import {RegisterUserRequestDTO} from '@models/dto';
import {UserRegistrationFormService} from '@services/forms';
import {NavbarComponent} from '@components/general';

/**
 * Component for the user registration page.
 * @author dgutierrez
 */
@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    InterestsFormComponent,
    ItWorkedAsNurseryHomeFormComponent,
    LocationFormComponent,
    MatButton,
    NavbarComponent,
    PasswordFormComponent,
    PersonalDataUserRegistrationFormComponent,
    ReactiveFormsModule,
    TranslatePipe,
    VolunteerOptionFormComponent,
  ],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class RegisterPage implements OnInit {
  private readonly alertService = inject(AlertService);
  private readonly authHttpService = inject(AuthHttpService);
  private readonly router = inject(Router);
  readonly cantonHttpService = inject(CantonHttpService);
  readonly districtHttpService = inject(DistrictHttpService);
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);
  readonly interestHttpService = inject(InterestHttpService);
  readonly municipalityHttpService = inject(MunicipalityHttpService);
  readonly userRegistrationFormService = inject(UserRegistrationFormService);

  constructor() {
    this.userRegistrationFormService.setupVolunteerMunicipalityEffect(this.userRegistrationFormService.formUserRegistration);
  }

  ngOnInit() {
    this.interestHttpService.getAll();
    this.municipalityHttpService.getAll();
    this.cantonHttpService.getAll();
  }

  /**
   * Handles the form submission for user registration.
   * @author dgutierrez
   */
  onSubmit() {
    if (this.userRegistrationFormService.formUserRegistration.invalid) {
      this.formsService.markFormTouchedAndDirty(this.userRegistrationFormService.formUserRegistration);
      this.alertService.displayAlert({
        messageKey: I18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      });
      return;
    }
    this.registerUser();
  }

  /**
   * Completes the user registration by sending the form data to the server.
   * @author dgutierrez
   */
  private registerUser() {
    const {confirmPassword, volunteerMunicipality, ...rest} = this.userRegistrationFormService.formUserRegistration.getRawValue();
    const registerUserRequestDTO = RegisterUserRequestDTO.fromUser(
      new User({
        ...rest,
        municipality: new Municipality({id: volunteerMunicipality?.id})
      }),
      this.userRegistrationFormService.volunteerIntent()
    );

    this.authHttpService.registerUser(registerUserRequestDTO).subscribe({
      next: () => {
        this.alertService.displayAlert({
          messageKey: I18nPagesValidationsEnum.REGISTER_PAGE_REGISTERED_SUCCESSFULLY,
          type: AlertTypeEnum.SUCCESS
        });
        this.userRegistrationFormService.formUserRegistration.reset()
        this.navigateToLogin();
      },
      error: (error) => {
        this.alertService.displayAlert({message: error.error.description});
      }
    });
  }

  /**
   * Navigates to the login page.
   * @author dgutierrez
   */
  navigateToLogin() {
    this.router.navigate([PagesUrlsEnum.LOGIN]);
  }
}
