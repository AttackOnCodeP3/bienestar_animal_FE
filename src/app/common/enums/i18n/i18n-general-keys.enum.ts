/**
 * Enum for internationalization general keys.
 * @author dgutierrez
 */
export enum I18nGeneralKeysEnum {
  LANGUAGES = 'languages',
  THEMES = 'themes',
  GENERAL = 'general',

  // Languages
  SPANISH = I18nGeneralKeysEnum.LANGUAGES + '.spanish',
  ENGLISH = I18nGeneralKeysEnum.LANGUAGES + '.english',

  // Themes
  LIGHT = I18nGeneralKeysEnum.THEMES + '.light',
  DARK = I18nGeneralKeysEnum.THEMES + '.dark',
  SYSTEM = I18nGeneralKeysEnum.THEMES + '.system',

  // General
  PROVIDE_TEMPORARY_SHELTER = I18nGeneralKeysEnum.GENERAL + '.provideTemporaryShelter',
  PERSONAL_INFORMATION = I18nGeneralKeysEnum.GENERAL + '.personalInformation',
  LOCATION = I18nGeneralKeysEnum.GENERAL + '.location',
  ROLES = I18nGeneralKeysEnum.GENERAL + '.roles',
  HAS_THIS_CONTROL_BEEN_APPLIED = I18nGeneralKeysEnum.GENERAL + '.hasThisControlBeenApplied',
}
