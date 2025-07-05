import {Component, computed, effect, inject, OnInit, signal} from '@angular/core';
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
import {UserRegistrationFormService} from '@services/forms';

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
        this.navigateToLogin();
      },
      error: (error) => {
        this.alertService.displayAlert({message: error.error.description});
      }
    });
  }

  navigateToLogin() {
    this.router.navigate([PagesUrlsEnum.LOGIN]);
  }
}
