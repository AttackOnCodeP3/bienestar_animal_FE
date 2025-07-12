/**
 * Enum for i18n keys related to page validations.
 * This enum is used to define keys for validation messages on different pages. For validation messages
 * related to the business logic.
 * @author dgutierrez
 */
export enum I18nPagesValidationsEnum {
  VALIDATIONS = 'validations.',
  GENERAL = I18nPagesValidationsEnum.VALIDATIONS + 'general.',
  REGISTER_PAGE = I18nPagesValidationsEnum.VALIDATIONS + 'register-page.',
  COMPLETE_PROFILE_PAGE = I18nPagesValidationsEnum.VALIDATIONS + 'complete-profile-page.',
  CREATE_USER_PAGE = I18nPagesValidationsEnum.VALIDATIONS + 'create-user-page.',
  MUNICIPALITY_PAGE = I18nPagesValidationsEnum.VALIDATIONS + 'municipality-page.',
  EDIT_USER_PAGE = I18nPagesValidationsEnum.VALIDATIONS + 'edit-user-page.',
  CREATE_MUNICIPALITY_PAGE = I18nPagesValidationsEnum.VALIDATIONS + 'create-municipality-page.',

  // General
  GENERAL_INVALID_FIELDS = I18nPagesValidationsEnum.GENERAL + "invalidFields",
  GENERAL_INVALID_ID_TO_UPDATE = I18nPagesValidationsEnum.GENERAL + "invalidIdToUpdate",

  // Register Page
  REGISTER_PAGE_REGISTERED_SUCCESSFULLY = I18nPagesValidationsEnum.REGISTER_PAGE + "registeredSuccessfully",

  //Complete Profile Page
  COMPLETE_PROFILE_PROFILE_COMPLETED_SUCCESSFULLY = I18nPagesValidationsEnum.COMPLETE_PROFILE_PAGE + "profileCompletedSuccessfully",

  //Create User Page
  CREATE_USER_PAGE_USER_CREATED_SUCCESSFULLY = I18nPagesValidationsEnum.CREATE_USER_PAGE + "userCreatedSuccessfully",
  CREATE_USER_PAGE_ROLE_REQUIRED = I18nPagesValidationsEnum.CREATE_USER_PAGE + "roleRequired",

  MUNICIPALITY_PAGE_MUNICIPALITY_UPDATED_SUCCESSFULLY = I18nPagesValidationsEnum.MUNICIPALITY_PAGE + "municipalityUpdatedSuccessfully",

  EDIT_USER_PAGE_USER_UPDATED_SUCCESSFULLY = I18nPagesValidationsEnum.EDIT_USER_PAGE + "userUpdatedSuccessfully",

  CREATE_MUNICIPALITY_PAGE_MUNICIPALITY_CREATED_SUCCESSFULLY = I18nPagesValidationsEnum.CREATE_MUNICIPALITY_PAGE + "municipalityCreatedSuccessfully",
}
