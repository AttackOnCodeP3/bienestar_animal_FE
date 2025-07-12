/**
 * Enum for internationalization pages labels.
 * @author dgutierrez
 */
export enum I18nPagesEnum {
  LOGIN_PAGE = 'login-page',
  REGISTER_PAGE = 'register-page',
  COMPLETE_PROFILE_PAGE = 'complete-profile-page',
  MUNICIPALITY_PAGE = 'municipalities-management-page',
  USER_MANAGEMENT_PAGE = 'user-management-page',
  CREATE_USER_PAGE = 'create-user-page',
  EDIT_USER_PAGE = 'edit-user-page',
  // Login page
  LOGIN_PAGE_TITLE = I18nPagesEnum.LOGIN_PAGE + '.title',
  LOGIN_PAGE_OR_REGISTER_WITH = I18nPagesEnum.LOGIN_PAGE + '.orRegisterWith',

  // Register page
  REGISTER_PAGE_TITLE = I18nPagesEnum.REGISTER_PAGE + '.title',

  // Complete Profile page
  COMPLETE_PROFILE_PAGE_TITLE = I18nPagesEnum.COMPLETE_PROFILE_PAGE + '.title',
  COMPLETE_PROFILE_PAGE_SUBTITLE = I18nPagesEnum.COMPLETE_PROFILE_PAGE + '.subtitle',

  // Municipality page
  MUNICIPALITY_PAGE_TITLE = I18nPagesEnum.MUNICIPALITY_PAGE + '.title',

  // User Management page
  USER_MANAGEMENT_PAGE_TITLE = I18nPagesEnum.USER_MANAGEMENT_PAGE + '.title',

  // Create User page
  CREATE_USER_PAGE_TITLE = I18nPagesEnum.CREATE_USER_PAGE + '.title',

  // Edit User page
  EDIT_USER_PAGE_TITLE = I18nPagesEnum.EDIT_USER_PAGE + '.title',
}
