const PATH_AUTH_ROUTES = 'auth';
const PATH_GAMIFICATION_ROUTES = 'gamification';
const PATH_REPORTS_ROUTES = 'reports';
const PATH_HOME_ROUTES = 'home';
const PATH_DASHBOARD_ROUTES = 'dashboard';
const PATH_SECURITY_ROUTES = 'security';
const PATH_MUNICIPALITIES = 'municipalities';
const VOID_PATH = '';

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
  MUNICIPALITIES = PATH_MUNICIPALITIES,

  // Auth
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot-password',
  ACCESS_DENIED = 'access-denied',
  SOCIAL_CALLBACK = 'social-callback',
  COMPLETE_PROFILE = 'complete-profile',

  // Gamification
  REWARDS_SYSTEM = 'rewards-system',

  // Reports
  REPORT_1 = 'report-1',

  // Security
  SECURITY_USER_MANAGEMENT = 'user-management',

  // Municipality
  MUNICIPALITY_LIST = 'municipality-list',
  MUNICIPALITY_CREATE = 'municipality-create',
  MUNICIPALITY_EDIT = 'municipality-edit',
}
