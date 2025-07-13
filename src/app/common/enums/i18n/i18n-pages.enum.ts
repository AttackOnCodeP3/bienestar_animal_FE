/**
 * Enum for internationalization pages labels.
 * @author dgutierrez
 */
export enum I18nPagesEnum {
  LOGIN_PAGE = 'login-page',
  REGISTER_PAGE = 'register-page',
  COMPLETE_PROFILE_PAGE = 'complete-profile-page',
  // Login page
  LOGIN_PAGE_TITLE = I18nPagesEnum.LOGIN_PAGE + '.title',
  LOGIN_PAGE_OR_REGISTER_WITH = I18nPagesEnum.LOGIN_PAGE + '.orRegisterWith',

  // Forgot Password page
  FORGOT_PASSWORD_PAGE = 'forgot-password-page',
  FORGOT_PASSWORD_PAGE_TITLE = I18nPagesEnum.FORGOT_PASSWORD_PAGE + '.title',
  FORGOT_PASSWORD_PAGE_SUBTITLE = I18nPagesEnum.FORGOT_PASSWORD_PAGE + '.subtitle',


  // Register page
  REGISTER_PAGE_TITLE = I18nPagesEnum.REGISTER_PAGE + '.title',

  // Complete Profile page
  COMPLETE_PROFILE_PAGE_TITLE = I18nPagesEnum.COMPLETE_PROFILE_PAGE + '.title',
  COMPLETE_PROFILE_PAGE_SUBTITLE = I18nPagesEnum.COMPLETE_PROFILE_PAGE + '.subtitle',

}
