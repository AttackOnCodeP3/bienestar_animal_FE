import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
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
import {Canton, District, Interest, Municipality, Neighborhood, User} from '@models';
import {toSignal} from '@angular/core/rxjs-interop';
import {matchFieldsValidations} from '@common/forms';
import {MatButton} from '@angular/material/button';
import {I18nPagesValidationsEnum} from '@common/enums/i18n';
import {AlertTypeEnum, PagesUrlsEnum} from '@common/enums';
import {Router} from '@angular/router';
import {CompleteProfileRequestDTO} from '@models/dto';

@Component({
  selector: 'app-complete-profile',
  imports: [
    InterestsFormComponent,
    ItWorkedAsNurseryHomeFormComponent,
    LocationFormComponent,
    NavbarComponent,
    PersonalDataUserRegistrationFormComponent,
    TranslatePipe,
    VolunteerOptionFormComponent,
    MatButton,
  ],
  templateUrl: './complete-profile.page.html',
  styleUrl: './complete-profile.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class CompleteProfilePage implements OnInit {
  private readonly router = inject(Router);
  readonly alertService = inject(AlertService);
  readonly authHttpService = inject(AuthHttpService);
  readonly cantonHttpService = inject(CantonHttpService);
  readonly districtHttpService = inject(DistrictHttpService);
  readonly formsService = inject(FormsService)
  readonly i18nService = inject(I18nService)
  readonly interestHttpService = inject(InterestHttpService);
  readonly municipalityHttpService = inject(MunicipalityHttpService);

  readonly volunteerIntent = signal(false);
  readonly formPersonalDataUser = this.formsService.formsBuilder.group({
    identificationCard: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]), //disabled
    lastname: new FormControl('', [Validators.required]), //disabled
    email: new FormControl('', [Validators.required, Validators.email]), //disabled
    phoneNumber: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    isNurseryHome: new FormControl(false, [Validators.required]),
    interests: new FormControl<Interest[]>([]),
    canton: new FormControl<Canton | null>(null, [Validators.required]),
    district: new FormControl<District | null>(null, [Validators.required]),
    neighborhood: new FormControl<Neighborhood | null>(null, [Validators.required]),
    password: new FormControl('', [Validators.required]), //disabled
    confirmPassword: new FormControl('', [Validators.required]), //disabled
    volunteerMunicipality: new FormControl<Municipality | null>(null, [Validators.required]),
  }, {
    validators: matchFieldsValidations('password', 'confirmPassword'),
  });

  readonly isNurseryHome = toSignal(this.formPersonalDataUser.controls.isNurseryHome?.valueChanges, {initialValue: this.formPersonalDataUser.controls.isNurseryHome?.value});

  private readonly enableDisableVolunteerMunicipalityEffect = effect(() => {
    this.enableDisableVolunteerMunicipality(this.volunteerIntent());
  });

  ngOnInit() {
    this.loadUserData();
    this.disableFormControls();
    this.cantonHttpService.getAll();
    this.interestHttpService.getAll();
    this.municipalityHttpService.getAll();
  }

  onSubmit() {
    if (this.formPersonalDataUser.invalid) {
      this.formsService.markFormTouchedAndDirty(this.formPersonalDataUser);
      this.alertService.displayAlert({
        messageKey: I18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      })
      return;
    }
    this.completeProfile();
  }

  private completeProfile() {
    const formValue = this.formPersonalDataUser.value;
    const completeProfileRequestDTO = CompleteProfileRequestDTO.fromUser(new User(formValue), this.volunteerIntent());

    this.authHttpService.completeProfile(completeProfileRequestDTO).subscribe({
      next: () => {
        this.alertService.displayAlert({
          messageKey: I18nPagesValidationsEnum.REGISTER_PAGE_REGISTERED_SUCCESSFULLY,
          type: AlertTypeEnum.SUCCESS
        })
        this.navigateToDashboard();
      },
      error: (error) => {
        this.alertService.displayAlert({message: error.error.description})
      }
    });
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
   * Loads the current user's data into the form for personal data.
   * @author dgutierrez
   */
  private loadUserData() {
    const currentUser = this.authHttpService.currentUser();
    this.formPersonalDataUser.patchValue({
      name: currentUser.name,
      lastname: currentUser.lastname,
      email: currentUser.email,
    });
  }

  /**
   * Disables the form controls for personal data.
   * @author dgutierrez
   */
  private disableFormControls() {
    this.formPersonalDataUser.get('name')?.disable();
    this.formPersonalDataUser.get('lastname')?.disable();
    this.formPersonalDataUser.get('email')?.disable();
    this.formPersonalDataUser.get('password')?.disable();
    this.formPersonalDataUser.get('confirmPassword')?.disable();
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
   * Handles the change event of the canton selection.
   * @param interests - The selected interests.
   * @author dgutierrez
   */
  interestsChange(interests: Interest[]) {
    this.formPersonalDataUser.get('interests')?.setValue(interests);
  }

  /**
   * Navigates to the login page.
   * @author dgutierrez
   */
  navigateToDashboard() {
    this.router.navigate([PagesUrlsEnum.DASHBOARD])
  }
}
