import {Component, computed, effect, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {firstValueFrom} from 'rxjs';
import {
  CantonHttpService,
  DistrictHttpService,
  MunicipalityHttpService,
  RoleHttpService,
  UserHttpService
} from '@services/http';
import {Constants} from '@common/constants/constants';
import {UserRegistrationFormService} from '@services/forms';
import {GeneralContainerComponent} from '@components/layout';
import {
  LocationFormComponent,
  PersonalDataUserRegistrationFormComponent,
  RoleSelectorFormComponent
} from '@components/forms/user';
import {AlertTypeEnum, PagesUrlsEnum, RouteParamsEnum} from '@common/enums';
import {AlertService, FormsService, I18nService} from '@services/general';
import {Role, User} from '@models';
import {UpdateUserRequestDto} from '@models/dto';

@Component({
  selector: 'app-edit-user',
  imports: [
    GeneralContainerComponent,
    LocationFormComponent,
    MatButton,
    MatIcon,
    PersonalDataUserRegistrationFormComponent,
    RoleSelectorFormComponent,
    TranslatePipe
  ],
  templateUrl: './edit-user.page.html',
  styleUrl: './edit-user.page.scss',
  providers: [UserRegistrationFormService],
  changeDetection: Constants.changeDetectionStrategy
})
export class EditUserPage implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
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

  readonly userToUpdate = computed(() => this.userHttpService.selectedUserById());

  /**
   * @author dgutierrez
   */
  private readonly initializeFormWithUserToUpdateEffect = effect(() => {
    const user = this.userToUpdate();
    if (user) {
      this.userRegistrationFormService.populateUserRegistrationForm(user);
      this.userRegistrationFormService.populateUserRolesForm(user);
    }
  });

  async ngOnInit() {
    this.userRegistrationFormService.setupFormForAdminUserCreationOrUpdate();
    this.municipalityHttpService.getAll();
    this.cantonHttpService.getAll();
    this.roleHttpService.getAll();
    await this.inicializeUserToEdit();
  }

  /**
   * Handles the form submission for updating a user.
   * @author dgutierrez
   */
  onSubmit() {
    const validationResult = this.userRegistrationFormService.validateUserRegistrationForms();
    if (validationResult) {
      const {form, errorMessageKey} = validationResult;
      this.formsService.markFormTouchedAndDirty(form);
      this.alertService.displayAlert({messageKey: errorMessageKey});
      return;
    }
    this.updateUser();
  }

  /**
   * Updates the user using the data from the forms.
   * @author dgutierrez
   */
  private updateUser() {
    const userData = this.userRegistrationFormService.buildUserPayloadFromForms();
    const roles = (userData?.roles ?? []).map(role => new Role({id: role.id}));
    const updateUserRequest = UpdateUserRequestDto.fromUser(new User({
      ...this.userToUpdate(),
      ...userData,
      roles
    }));

    this.userHttpService.update(updateUserRequest);
    this.router.navigate([PagesUrlsEnum.SECURITY_USER_MANAGEMENT])
    this.alertService.displayAlert({
      messageKey: this.i18nService.i18nPagesValidationsEnum.EDIT_USER_PAGE_USER_UPDATED_SUCCESSFULLY,
      type: AlertTypeEnum.SUCCESS
    })
  }

  /**
   * Initializes the user to edit by retrieving the user ID from the route parameters
   * @author dgutierrez
   */
  private async inicializeUserToEdit() {
    const userId = await this.getUserIdFromRoute();
    if (userId) {
      this.userHttpService.getById(userId)
    }
  }

  /**
   * Retrieves the user ID from the route parameters.
   * If the user ID is not found, it displays an alert and navigates to the user management page.
   * @return {Promise<string | null>} The user ID if found, otherwise null.
   * @author dgutierrez
   */
  async getUserIdFromRoute(): Promise<number | null> {
    const params = await firstValueFrom(this.activatedRoute.paramMap);
    const userId = params.get(RouteParamsEnum.USER_ID);
    if (!userId) {
      this.alertService.displayAlert({
        message: "User ID not found in route parameters.",
      });
      this.navigateToUserManagement();
      return null;
    }

    return parseInt(userId, 10);
  }

  /**
   * Navigates to the user management page.
   * @author dgutierrez
   */
  navigateToUserManagement() {
    this.router.navigate([PagesUrlsEnum.SECURITY_USER_MANAGEMENT]);
  }
}
