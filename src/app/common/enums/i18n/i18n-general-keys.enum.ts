/**
 * Enum for internationalization general keys.
 * @author dgutierrez
 */
export enum I18nGeneralKeysEnum {
  LANGUAGES = 'languages',
  THEMES = 'themes',

  // Languages
  SPANISH = I18nGeneralKeysEnum.LANGUAGES + '.spanish',
  ENGLISH = I18nGeneralKeysEnum.LANGUAGES + '.english',

  // Themes
  LIGHT = I18nGeneralKeysEnum.THEMES + '.light',
  DARK = I18nGeneralKeysEnum.THEMES + '.dark',
  SYSTEM = I18nGeneralKeysEnum.THEMES + '.system',
}
