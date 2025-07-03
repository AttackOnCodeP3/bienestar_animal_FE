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

  // General
  GENERAL_INVALID_FIELDS = I18nPagesValidationsEnum.GENERAL + "invalidFields",

  // Register Page
  REGISTER_PAGE_REGISTERED_SUCCESSFULLY = I18nPagesValidationsEnum.REGISTER_PAGE + "registeredSuccessfully",
}
