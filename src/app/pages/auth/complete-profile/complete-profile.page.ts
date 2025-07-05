import {Component, computed, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {NavbarComponent} from '@components/general';
import {
  InterestsFormComponent,
  ItWorkedAsNurseryHomeFormComponent,
  LocationFormComponent,
  PersonalDataUserRegistrationFormComponent,
  VolunteerOptionFormComponent
} from '@components/forms/user';
import {
  AuthHttpService,
  CantonHttpService,
  DistrictHttpService,
  InterestHttpService,
  MunicipalityHttpService
} from '@services/http';
import {TranslatePipe} from '@ngx-translate/core';
import {AlertService, FormsService, I18nService} from '@services/general';
import {Municipality, User} from '@models';
import {MatButton} from '@angular/material/button';
import {I18nPagesValidationsEnum} from '@common/enums/i18n';
import {AlertTypeEnum, PagesUrlsEnum} from '@common/enums';
import {Router} from '@angular/router';
import {CompleteProfileRequestDTO} from '@models/dto';
import {UserRegistrationFormService} from '@services/forms';

@Component({
  selector: 'app-complete-profile',
  imports: [
    InterestsFormComponent,
    ItWorkedAsNurseryHomeFormComponent,
    LocationFormComponent,
    MatButton,
    NavbarComponent,
    PersonalDataUserRegistrationFormComponent,
    TranslatePipe,
    VolunteerOptionFormComponent,
  ],
  templateUrl: './complete-profile.page.html',
  styleUrl: './complete-profile.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class CompleteProfilePage implements OnInit {
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
    this.loadUserData();
    this.disableFormControls();

    this.cantonHttpService.getAll();
    this.interestHttpService.getAll();
    this.municipalityHttpService.getAll();
  }

  /**
   * Handles the form submission to complete the user profile.
   * Validates the form before sending the request.
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
    this.completeProfile();
  }

  /**
   * Calls the API to complete the user profile based on form data.
   * On success, navigates to the dashboard. On failure, displays an error alert.
   * @author dgutierrez
   */
  private completeProfile() {
    const { volunteerMunicipality, ...rest } = this.userRegistrationFormService.formUserRegistration.getRawValue();
    const completeProfileRequestDTO = CompleteProfileRequestDTO.fromUser(
      new User({
        ...rest,
        municipality: new Municipality({ id: volunteerMunicipality?.id })
      }),
      this.userRegistrationFormService.volunteerIntent()
    );

    this.authHttpService.completeProfile(completeProfileRequestDTO).subscribe({
      next: () => {
        this.alertService.displayAlert({
          messageKey: I18nPagesValidationsEnum.COMPLETE_PROFILE_PROFILE_COMPLETED_SUCCESSFULLY,
          type: AlertTypeEnum.SUCCESS
        });
        this.navigateToDashboard();
      },
      error: (error) => {
        this.alertService.displayAlert({ message: error.error.description });
      }
    });
  }

  /**
   * Loads user data from the current session and fills name, lastname, and email fields.
   * @author dgutierrez
   */
  private loadUserData() {
    const currentUser = this.authHttpService.currentUser();
    this.userRegistrationFormService.formUserRegistration.patchValue({
      name: currentUser.name,
      lastname: currentUser.lastname,
      email: currentUser.email,
    });
  }

  /**
   * Disables fields are not editable by the user or needed for the complete profile.
   * @author dgutierrez
   */
  private disableFormControls() {
    this.userRegistrationFormService.formUserRegistration.get('name')?.disable();
    this.userRegistrationFormService.formUserRegistration.get('lastname')?.disable();
    this.userRegistrationFormService.formUserRegistration.get('email')?.disable();
    this.userRegistrationFormService.formUserRegistration.get('password')?.disable();
    this.userRegistrationFormService.formUserRegistration.get('confirmPassword')?.disable();
  }

  /**
   * Navigates to the login page.
   * @author dgutierrez
   */
  navigateToDashboard() {
    this.router.navigate([PagesUrlsEnum.DASHBOARD]);
  }
}
