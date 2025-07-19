const PATH_AUTH_ROUTES = 'auth';
const PATH_GAMIFICATION_ROUTES = 'gamification';
const PATH_REPORTS_ROUTES = 'reports';
const PATH_HOME_ROUTES = 'home';
const PATH_DASHBOARD_ROUTES = 'dashboard';
const PATH_SECURITY_ROUTES = 'security';
const VOID_PATH = '';

/**
 * Enum for application routes URLs.
 * @author dgutierrez
 */
export enum RoutesUrlsEnum {
  // Utility routes
  VOID_ROUTE = VOID_PATH,
  SLASH = '/',
  DASHBOARD = PATH_DASHBOARD_ROUTES,
  SECURITY = PATH_SECURITY_ROUTES,

  // Main routes
  HOME = PATH_HOME_ROUTES,
  AUTH = PATH_AUTH_ROUTES,
  GAMIFICATION = PATH_GAMIFICATION_ROUTES,
  REPORTS = PATH_REPORTS_ROUTES,

  // Auth routes
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot-password',
  ACCESS_DENIED = 'access-denied',
  SOCIAL_CALLBACK = 'social-callback',
  COMPLETE_PROFILE = 'complete-profile',

  // Gemification routes
  REWARDS_SYSTEM = 'rewards-system',

  // Reports routes
  //TODO: Later change the this for the correct report names
  REPORT_1 = 'report-1',

  //Security routes
  SECURITY_USER_MANAGEMENT = 'user-management',

  MODEL_3D = 'model-3d',

}
