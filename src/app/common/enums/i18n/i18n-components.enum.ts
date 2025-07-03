/**
 * Enum for I18n components
 * @author dgutierrez
 */
export enum I18nComponentsEnum {
  IT_WORKED_AS_NURSERY_HOME_COMPONENT = 'it-worked-as-nursery-home-form-component',
  INTERESTS_COMPONENT = 'interests-form-component',
  PASSWORD_FORM_COMPONENT = 'password-form-component',
  VOLUNTEER_OPTION_FORM_COMPONENT = 'volunteer-option-form-component',

  IT_WORKED_AS_NURSERY_HOME_LABEL = I18nComponentsEnum.IT_WORKED_AS_NURSERY_HOME_COMPONENT + '.currentlyWorksAsNurseryHome',
  IT_WORKED_AS_NURSERY_HOME_DESCRIPTION = I18nComponentsEnum.IT_WORKED_AS_NURSERY_HOME_COMPONENT + '.descriptionNurseryHome',

  INTERESTS_TITLE = I18nComponentsEnum.INTERESTS_COMPONENT + '.title',
  INTERESTS_DESCRIPTION = I18nComponentsEnum.INTERESTS_COMPONENT + '.description',

  PASSWORD_FORM_TITLE = I18nComponentsEnum.PASSWORD_FORM_COMPONENT + '.title',

  VOLUNTEER_OPTION_FORM_TITLE = I18nComponentsEnum.VOLUNTEER_OPTION_FORM_COMPONENT + '.title',
  VOLUNTEER_OPTION_FORM_DESCRIPTION = I18nComponentsEnum.VOLUNTEER_OPTION_FORM_COMPONENT + '.description',
}
