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
  CREATE_ANIMAL_PROFILE_PAGE = I18nPagesValidationsEnum.VALIDATIONS + 'create-animal-profile-page.',

  // General
  GENERAL_INVALID_FIELDS = I18nPagesValidationsEnum.GENERAL + "invalidFields",
  GENERAL_INVALID_ID_TO_UPDATE = I18nPagesValidationsEnum.GENERAL + "invalidIdToUpdate",
  GENERAL_LOCATION_NOT_AVAILABLE = I18nPagesValidationsEnum.GENERAL + "locationNotAvailable",
  GENERAL_NO_FILE_SELECTED = I18nPagesValidationsEnum.GENERAL + "noFileSelected",

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

  CREATE_ANIMAL_PROFILE_PAGE_ANIMAL_PROFILE_CREATED_SUCCESSFULLY = I18nPagesValidationsEnum.CREATE_ANIMAL_PROFILE_PAGE + "animalProfileCreatedSuccessfully",
  CREATE_ANIMAL_PROFILE_PAGE_ANIMAL_PROFILE_VACCINATION_REQUIRED = I18nPagesValidationsEnum.CREATE_ANIMAL_PROFILE_PAGE + "animalProfileVaccinationRequired",
}
