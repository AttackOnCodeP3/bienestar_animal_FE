import {Component, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {GeneralContainerComponent} from '@components/layout';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {
  LocationFormComponent,
  PersonalDataUserRegistrationFormComponent,
  RoleSelectorFormComponent,
} from '@components/forms/user';
import {TranslatePipe} from '@ngx-translate/core';
import {AlertService, FormsService, I18nService} from '@services/general';
import {UserRegistrationFormService} from '@services/forms';
import {
  CantonHttpService,
  DistrictHttpService,
  InterestHttpService,
  MunicipalityHttpService,
  RoleHttpService,
  UserHttpService
} from '@services/http';
import {I18nPagesValidationsEnum} from '@common/enums/i18n';
import {RegisterUserRequestDTO} from '@models/dto';
import {Role, User} from '@models';
import {AlertTypeEnum, PagesUrlsEnum} from '@common/enums';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-user',
  imports: [
    GeneralContainerComponent,
    MatButton,
    MatIcon,
    LocationFormComponent,
    PersonalDataUserRegistrationFormComponent,
    TranslatePipe,
    RoleSelectorFormComponent,
  ],
  templateUrl: './create-user.page.html',
  styleUrl: './create-user.page.scss',
  providers: [UserRegistrationFormService],
  changeDetection: Constants.changeDetectionStrategy
})
export class CreateUserPage implements OnInit {
  private readonly router = inject(Router);
  readonly alertService = inject(AlertService);
  readonly cantonHttpService = inject(CantonHttpService);
  readonly districtHttpService = inject(DistrictHttpService);
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);
  readonly interestHttpService = inject(InterestHttpService);
  readonly municipalityHttpService = inject(MunicipalityHttpService);
  readonly roleHttpService = inject(RoleHttpService);
  readonly userHttpService = inject(UserHttpService);
  readonly userRegistrationFormService = inject(UserRegistrationFormService);

  ngOnInit() {
    this.interestHttpService.getAll();
    this.municipalityHttpService.getAll();
    this.cantonHttpService.getAll();
    this.roleHttpService.getAll();

    this.userRegistrationFormService.setupFormForAdminUserCreation();
  }

  onSubmit() {
    if (!this.validForms()) {
      return;
    }
   this.registerUser();
  }

  /**
   * Registers a new user using the data from the forms.
   * @author dgutierrez
   */
  private registerUser() {
    const userData = this.getFormsUserData();
    const registerUserRequest = RegisterUserRequestDTO.fromUser(new User({
      ...userData,
      roles: userData?.roles?.map(role => new Role({id: role.id})) ?? []
    }));
    this.userHttpService.adminRegisterUser(registerUserRequest).subscribe({
      next: (_) => {
        this.alertService.displayAlert({
          messageKey: I18nPagesValidationsEnum.CREATE_USER_PAGE_USER_CREATED_SUCCESSFULLY,
          type: AlertTypeEnum.SUCCESS
        });
        this.userRegistrationFormService.resetForms();
      },
      error: (error) => {
        this.alertService.displayAlert({
          messageKey: error.error.description,
        });
      }
    })
  }

  /**
   * Validates the forms used in the user registration process.
   * @author
   */
  private validForms(): boolean {
    const {formUserRegistration, formUserRoleSelector} = this.userRegistrationFormService;

    const invalidForms = [
      {
        form: formUserRegistration,
        errorMessageKey: I18nPagesValidationsEnum.GENERAL_INVALID_FIELDS,
      },
      {
        form: formUserRoleSelector,
        errorMessageKey: I18nPagesValidationsEnum.CREATE_USER_PAGE_ROLE_REQUIRED,
      }
    ];

    for (const {form, errorMessageKey} of invalidForms) {
      if (form.invalid) {
        this.formsService.markFormTouchedAndDirty(form);
        this.alertService.displayAlert({messageKey: errorMessageKey});
        return false;
      }
    }

    return true;
  }

  /**
   * Retrieves the user data from the forms.
   * @author dgutierrez
   */
  private getFormsUserData() {
    const {formUserRegistration, formUserRoleSelector} = this.userRegistrationFormService;

    return {
      ...formUserRegistration.getRawValue(),
      roles: formUserRoleSelector.getRawValue().roles
    };
  }

  /**
   * Navigates to the user management page.
   * @author dgutierrez
   */
  navigateToUserManagement() {
    this.router.navigate([PagesUrlsEnum.SECURITY_USER_MANAGEMENT]);
  }
}
