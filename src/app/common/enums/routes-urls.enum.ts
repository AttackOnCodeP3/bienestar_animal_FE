const PATH_AUTH_ROUTES = 'auth';
const PATH_GAMIFICATION_ROUTES = 'gamification';
const PATH_REPORTS_ROUTES = 'reports';
const PATH_HOME_ROUTES = 'home';
const PATH_DASHBOARD_ROUTES = 'dashboard';
const VOID_PATH = '';

/**
 * Enum for application routes URLs.
 * @author dgutierrez
 */
export enum RoutesUrlsEnum {
  // utility routes
  VOID_ROUTE = VOID_PATH,
  SLASH = '/',
  DASHBOARD = PATH_DASHBOARD_ROUTES,

  // Main routes
  HOME = PATH_HOME_ROUTES,
  AUTH = PATH_AUTH_ROUTES,
  GAMIFICATION = PATH_GAMIFICATION_ROUTES,
  REPORTS = PATH_REPORTS_ROUTES,

  // Gemification routes
  REWARDS_SYSTEM = 'rewards-system',

  // Reports routes
  //TODO: Later change the this for the correct report names
  REPORT_1 = 'report-1',
}
