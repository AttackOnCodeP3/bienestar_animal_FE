import {RoutesUrlsEnum} from '@common/enums';

/**
 * Enum for defining the URLs of different pages in the application.
 * This enum is used to manage the routing paths for various pages,
 * ensuring consistency and ease of maintenance.
 * @author dgutierrez
 */
export enum PagesUrlsEnum {
  // Utility routes
  VOID_ROUTE = RoutesUrlsEnum.VOID_ROUTE,

  // Routes of the Authentication module
  AUTH = RoutesUrlsEnum.AUTH,
  LOGIN = RoutesUrlsEnum.AUTH + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.LOGIN,
  REGISTER = RoutesUrlsEnum.AUTH + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.REGISTER,
  FORGOT_PASSWORD = RoutesUrlsEnum.AUTH + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.FORGOT_PASSWORD,
  CHANGE_PASSWORD = RoutesUrlsEnum.AUTH + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.CHANGE_PASSWORD,
  ACCESS_DENIED = RoutesUrlsEnum.AUTH + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.ACCESS_DENIED,
  COMPLETE_PROFILE = RoutesUrlsEnum.AUTH + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.COMPLETE_PROFILE,

  // Routes of the Main Dashboard
  DASHBOARD = RoutesUrlsEnum.DASHBOARD,
  HOME = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.HOME,
  GAMIFICATION = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.GAMIFICATION,
  REPORTS = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.REPORTS,

  // Routes of the Municipalities module
  MUNICIPALITIES = RoutesUrlsEnum.MUNICIPALITIES,
  MUNICIPALITY_LIST = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.MUNICIPALITIES + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.MUNICIPALITY_LIST,
  MUNICIPALITY_CREATE = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.MUNICIPALITIES + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.MUNICIPALITY_CREATE,
  MUNICIPALITY_EDIT = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.MUNICIPALITIES + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.MUNICIPALITY_EDIT,

  // Routes of the Security module
  SECURITY_USER_MANAGEMENT = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.SECURITY + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.SECURITY_USER_MANAGEMENT,
  SECURITY_CREATE_USER = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.SECURITY + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.SECURITY_CREATE_USER,
  SECURITY_EDIT_USER = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.SECURITY + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.SECURITY_EDIT_USER,
}
