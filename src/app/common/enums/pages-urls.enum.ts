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
  MUNICIPALITIES = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.MUNICIPALITIES,
  MUNICIPALITY_LIST = PagesUrlsEnum.MUNICIPALITIES + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.MUNICIPALITY_LIST,
  MUNICIPALITY_CREATE = PagesUrlsEnum.MUNICIPALITIES + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.MUNICIPALITY_CREATE,
  MUNICIPALITY_EDIT = PagesUrlsEnum.MUNICIPALITIES + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.MUNICIPALITY_EDIT,

  // Routes of the Security module
  SECURITY_USER_MANAGEMENT = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.SECURITY + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.SECURITY_USER_MANAGEMENT,
  SECURITY_CREATE_USER = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.SECURITY + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.SECURITY_CREATE_USER,
  SECURITY_EDIT_USER = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.SECURITY + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.SECURITY_EDIT_USER,

  // MODEL_3D Routes
  MODEL_3D_CREATE = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.MODEL_3D + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.MODEL_3D_CREATE,
  MODEL_3D_LIST = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.MODEL_3D + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.MODEL_3D_LIST,

  // Routes of the Notification Rules module
  NOTIFICATION_RULES = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.NOTIFICATION_RULES,
  NOTIFICATION_RULES_EDIT = PagesUrlsEnum.NOTIFICATION_RULES + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.NOTIFICATION_RULES_EDIT,
  NOTIFICATION_RULES_LIST = PagesUrlsEnum.NOTIFICATION_RULES + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.NOTIFICATION_RULES_LIST,

  // Routes of the Announcements module
  ANNOUNCEMENTS = RoutesUrlsEnum.DASHBOARD + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.ANNOUNCEMENTS,
  ANNOUNCEMENTS_LIST = PagesUrlsEnum.ANNOUNCEMENTS + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.ANNOUNCEMENTS_LIST,
  ANNOUNCEMENTS_CREATE = PagesUrlsEnum.ANNOUNCEMENTS + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.ANNOUNCEMENTS_CREATE,
  ANNOUNCEMENTS_EDIT = PagesUrlsEnum.ANNOUNCEMENTS + RoutesUrlsEnum.SLASH + RoutesUrlsEnum.ANNOUNCEMENTS_EDIT,
}
