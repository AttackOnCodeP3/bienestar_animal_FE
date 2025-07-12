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
  readonly municipalityHttpService = inject(MunicipalityHttpService);
  readonly roleHttpService = inject(RoleHttpService);
  readonly userHttpService = inject(UserHttpService);
  readonly userRegistrationFormService = inject(UserRegistrationFormService);

  ngOnInit() {
    this.municipalityHttpService.getAll();
    this.cantonHttpService.getAll();
    this.roleHttpService.getAll();

    this.userRegistrationFormService.setupFormForAdminUserCreationOrUpdate();
  }

  onSubmit() {
    const validationResult = this.userRegistrationFormService.validateUserRegistrationForms();

    if (validationResult) {
      const {form, errorMessageKey} = validationResult;
      this.formsService.markFormTouchedAndDirty(form);
      this.alertService.displayAlert({messageKey: errorMessageKey});
      return;
    }
    this.registerUser();
  }

  /**
   * Registers a new user using the data from the forms.
   * @author dgutierrez
   */
  private registerUser() {
    this.userHttpService.adminRegisterUser(
      this.buildCreateUserRequestDTO()
    ).subscribe({
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
   * Builds the request DTO for creating a user.
   * @author dgutierrez
   */
  private buildCreateUserRequestDTO() {
    const userData = this.userRegistrationFormService.buildUserPayloadFromForms();
    return RegisterUserRequestDTO.fromUser(new User({
      ...userData,
      roles: userData?.roles?.map(role => new Role({id: role.id})) ?? []
    }));
  }

  /**
   * Navigates to the user management page.
   * @author dgutierrez
   */
  navigateToUserManagement() {
    this.router.navigate([PagesUrlsEnum.SECURITY_USER_MANAGEMENT]);
  }
}
