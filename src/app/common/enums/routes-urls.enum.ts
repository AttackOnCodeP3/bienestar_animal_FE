const PATH_AUTH_ROUTES = 'auth';
const PATH_GAMIFICATION_ROUTES = 'gamification';
const PATH_REPORTS_ROUTES = 'reports';
const PATH_HOME_ROUTES = 'home';
const PATH_DASHBOARD_ROUTES = 'dashboard';
const PATH_SECURITY_ROUTES = 'security';
const PATH_MUNICIPALITIES = 'municipalities';
const PATH_ANIMAL_ROUTES = 'animal';
const PATH_NOTIFICATION_RULES = 'notification-rules';
const VOID_PATH = '';

export enum RoutesUrlsEnum {
  // Utility routes
  VOID_ROUTE = VOID_PATH,
  SLASH = '/',
  DASHBOARD = PATH_DASHBOARD_ROUTES,
  SECURITY = PATH_SECURITY_ROUTES,
  ANIMAL = PATH_ANIMAL_ROUTES,
  NOTIFICATION_RULES = PATH_NOTIFICATION_RULES,

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
  CHANGE_PASSWORD = 'change-password',

  // Gamification
  REWARDS_SYSTEM = 'rewards-system',

  // Reports
  //TODO: Later change the this for the correct report name
  REPORT_1 = 'report-1',

  // Security
  SECURITY_USER_MANAGEMENT = 'user-management',
  SECURITY_CREATE_USER = 'create-user',
  SECURITY_EDIT_USER = 'edit-user',

  // Municipality
  MUNICIPALITY_LIST = 'municipality-list',
  MUNICIPALITY_CREATE = 'municipality-create',
  MUNICIPALITY_EDIT = 'municipality-edit',

  //Animal
  CREATE_ANIMAL_PROFILE = 'create-animal-profile',
  ABANDONED_ANIMAL = 'abandoned-animal',
  CREATE_ABANDONED_ANIMAL = 'create-abandoned-animal',
  VIEW_ANIMAL_RECORD = 'view-animal-record',

  //model 3d
  MODEL_3D = 'model-3d',
  MODEL_3D_LIST = 'model-3d-list',
  MODEL_3D_CREATE = 'model-3d-create',

  //Notification Rules Municipality
  NOTIFICATION_RULES_EDIT = 'notification-rules-edit',
  NOTIFICATION_RULES_LIST = 'notification-rules-list',
}
