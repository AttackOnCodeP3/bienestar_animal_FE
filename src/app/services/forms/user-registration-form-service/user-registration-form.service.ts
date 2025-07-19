import {inject, Injectable, signal, effect, computed} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {Canton, District, Interest, Municipality, Neighborhood, Role, User} from '@models';
import {matchFieldsValidations} from '@common/forms';
import {I18nPagesValidationsEnum} from '@common/enums/i18n';
import {FormsService} from '@services/general';
import {IFormValidationError} from '@common/interfaces';

@Injectable()
export class UserRegistrationFormService {
  private readonly formsService = inject(FormsService)
  readonly formUserRegistration = this.buildUserForm();
  readonly formUserRoleSelector = this.buildUserFormRoleSelector();

  private readonly rolesListSelectedToSignal = toSignal(
    this.formUserRoleSelector.controls.roles.valueChanges,
    { initialValue: this.formUserRoleSelector.controls.roles.value || [] }
  );

  readonly volunteerIntent = signal(false);
  readonly rolesListSelected = computed(() => this.rolesListSelectedToSignal() ?? []);
  readonly isNurseryHome = computed(() => this.formUserRegistration.controls.isNurseryHome.value || false);

  /**
   * List of optional fields in the user registration form.
   * These fields are not required in the User entity in the backend.
   * @author dgutierrez
   */
  readonly optionalFields = [
    'identificationCard',
    'phoneNumber',
    'birthDate',
    'temporaryPassword',
    'municipality',
    'interests',
    'lastLoginDate'
  ];

  /**
   * Applies a reactive effect to enable/disable the volunteer municipality field.
   * @param form The form to apply the effect on
   * @author dgutierrez
   */
  setupVolunteerMunicipalityEffect(form: FormGroup): void {
    effect(() => {
      const control = form.get('volunteerMunicipality');
      if (!control) return;

      if (this.volunteerIntent()) {
        control.enable();
      } else {
        control.disable();
        control.setValue(null);
      }
    });
  }

  /**
   * Sets up the form for admin user creation or update by disabling certain fields.
   * This method is called when the form is used to create a user by an admin.
   * @author dgutierrez
   */
  setupFormForAdminUserCreationOrUpdate(): void {
    this.disableFormFieldsCreateUserByAdmin();
  }

  /**
   * Builds the shared form group used for both registration and profile completion.
   * @returns FormGroup instance with predefined structure and validators.
   * @author gutierrez
   */
  private buildUserForm() {
    return this.formsService.formsBuilder.group({
      identificationCard: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      isNurseryHome: new FormControl(false, [Validators.required]),
      interests: new FormControl<Interest[]>([]),
      canton: new FormControl<Canton | null>(null, [Validators.required]),
      district: new FormControl<District | null>(null, [Validators.required]),
      neighborhood: new FormControl<Neighborhood | null>(null, [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      volunteerMunicipality: new FormControl<Municipality | null>(null, [Validators.required]),
    }, {
      validators: matchFieldsValidations('password', 'confirmPassword'),
    });
  }

  /**
   * Builds the form group for user roles selection.
   * @author dgutierrez
   */
  private buildUserFormRoleSelector() {
    return this.formsService.formsBuilder.group({
      roles: new FormControl<Role[]>([], [Validators.required]),
    });
  }

  /**
   * Updates the "isNurseryHome" form control value.
   * @param form The form where the value should be set
   * @param checked The new value for the checkbox
   * @author dgutierrez
   */
  setNurseryHomeValue(form: FormGroup, checked: boolean): void {
    form.get('isNurseryHome')?.setValue(checked);
  }

  /**
   * Updates the "interests" form control value.
   * @param form The form where the interests should be set
   * @param interests The selected interests
   * @author dgutierrez
   */
  setInterests(form: FormGroup, interests: Interest[]): void {
    form.get('interests')?.setValue(interests);
  }

  /**
   * Sets the roles in the user role selector form.
   * @param form The form where the roles should be set
   * @param roles The selected roles
   * @author dgutierrez
   */
  private setRoles(form: FormGroup, roles: Role[]): void {
    form.get('roles')?.setValue(roles);
  }

  /**
   * Disables all form fields for user registration when created by an admin.
   * @author dgutierrez
   */
  private disableFormFieldsCreateUserByAdmin() {
    this.disablePasswordFields();
    this.disableVolunteerMunicipalityField();
    this.disableIsNurseryHomeField();
    this.disableInterestsField();
    this.clearOptionalFieldValidators();
  }

  /**
   * Disables the password and confirm password fields in the form.
   * @author dgutierrez
   */
  disablePasswordFields(): void {
    this.formUserRegistration.get('password')?.disable();
    this.formUserRegistration.get('confirmPassword')?.disable();
  }

  /**
   * Disables the volunteer municipality field in the form.
   * @author dgutierrez
   */
  disableVolunteerMunicipalityField(): void {
    this.formUserRegistration.get('volunteerMunicipality')?.disable();
  }

  /**
   * Disables the "isNurseryHome" field in the form.
   * @author dgutierrez
   */
  disableIsNurseryHomeField(): void {
    this.formUserRegistration.get('isNurseryHome')?.disable();
  }

  /**
   * Disables the interests field in the form.
   * @author dgutierrez
   */
  disableInterestsField(): void {
    this.formUserRegistration.get('interests')?.disable();
  }

  /**
   * Clears validators for optional fields in the form.
   * This is fields are not required in the User entity in the backend.
   * @author dgutierrez
   */
  clearOptionalFieldValidators() {
    this.optionalFields.forEach(field => {
      const control = this.formUserRegistration.get(field);
      if (control) {
        control.clearValidators();
        control.updateValueAndValidity();
      }
    });
  }

  /**
   * Resets both user registration and user role selector forms to their initial state.
   * @author dgutierrez
   */
  resetForms(){
    this.resetFormUserRegistration();
    this.resetUserRoleSelector();
  }

  /**
   * Resets the user registration form to its initial state.
   * @author dgutierrez
   */
  resetFormUserRegistration() {
    this.formUserRegistration.reset();
  }

  /**
   * Resets the user role selector form to its initial state.
   * @author dgutierrez
   */
  resetUserRoleSelector() {
    this.formUserRoleSelector.reset();
  }

  /**
   * Retrieves the user data from the forms.
   * @author dgutierrez
   */
  buildUserPayloadFromForms() {
    return {
      ...this.formUserRegistration.getRawValue(),
      roles: this.formUserRoleSelector.getRawValue().roles
    };
  }

  /**
   * Validates both forms and returns the first invalid form and its error key.
   * @returns IFormValidationError | null
   * If all forms are valid, returns null.
   * @author dgutierrez
   */
  validateUserRegistrationForms(): IFormValidationError | null {
    const { formUserRegistration, formUserRoleSelector } = this;

    const invalidForms = [
      {
        form: formUserRegistration,
        errorMessageKey: I18nPagesValidationsEnum.GENERAL_INVALID_FIELDS,
      },
      {
        form: formUserRoleSelector,
        errorMessageKey: I18nPagesValidationsEnum.CREATE_USER_PAGE_ROLE_REQUIRED,
      },
    ];

    for (const { form, errorMessageKey } of invalidForms) {
      if (form.invalid) {
        return { form, errorMessageKey };
      }
    }

    return null;
  }

  /**
   * Carga los datos personales y de ubicación del usuario en el formulario de registro.
   * Este método se utiliza para prellenar campos cuando se está editando un usuario.
   *
   * @param user Objeto `User` con los datos a cargar en el formulario de registro.
   * @author dgutierrez
   */
  populateUserRegistrationForm(user: User): void {
    this.formUserRegistration.patchValue({
      identificationCard: user.identificationCard,
      name: user.name,
      lastname: user.lastname,
      birthDate: user.birthDate,
      email: user.email,
      phoneNumber: user.phoneNumber,
      canton: user.neighborhood?.district?.canton ?? null,
      district: user.neighborhood?.district ?? null,
      neighborhood: user.neighborhood ?? null,
    });
  }

  /**
   * Carga los roles del usuario en el formulario de selección de roles.
   * Este método se utiliza para prellenar los roles cuando se está editando un usuario.
   *
   * @param user Objeto `User` con los roles a cargar en el formulario de roles.
   * @author dgutierrez
   */
  populateUserRolesForm(user: User): void {
    this.formUserRoleSelector.patchValue({
      roles: user.roles?.map(role => new Role(role)) ?? [],
    });
  }
}
