/**
 * Class that defines constant, read-only variables in the environment!
 *
 * NOTE: The purpose of this class is to store all variables that should NOT change
 *       regardless of the environment
 *       And leave in the child classes those that DO change according to the environment
 * @author dgutierrez
 */
export abstract class UnmutableConstants {

  static readonly HEADER_AUTH: string = 'Authorization'
  static readonly AUTHORITIES: string = 'authorities'


  // ==================================================================
  // Identifiers for local storage
  // ==================================================================
  private static readonly LS_TOKEN_BIENESTAR_ANIMAL_PREFIX: string = 'LS_BienestarAnimal_AppMovil_'
  static readonly LS_TOKEN_BIENESTAR_ANIMAL: string = UnmutableConstants.LS_TOKEN_BIENESTAR_ANIMAL_PREFIX + 'token'

  static readonly LS_USER_DATA_ID: string = UnmutableConstants.LS_TOKEN_BIENESTAR_ANIMAL_PREFIX + 'userDataId'

  static readonly LS_APP_PREFERENCE_PREFIX: string = UnmutableConstants.LS_TOKEN_BIENESTAR_ANIMAL_PREFIX + 'app-preference-'
  static readonly LS_APP_PREFERENCE_SCHEME: string = UnmutableConstants.LS_TOKEN_BIENESTAR_ANIMAL_PREFIX + UnmutableConstants.LS_APP_PREFERENCE_PREFIX + 'scheme'
  static readonly LS_APP_PREFERENCE_LANGUAGE: string = UnmutableConstants.LS_TOKEN_BIENESTAR_ANIMAL_PREFIX + UnmutableConstants.LS_APP_PREFERENCE_PREFIX + 'language'
  static readonly LS_APP_AUTH_USER: string = UnmutableConstants.LS_TOKEN_BIENESTAR_ANIMAL_PREFIX + 'authUser'
  static readonly LS_ACCESS_TOKEN: string = UnmutableConstants.LS_TOKEN_BIENESTAR_ANIMAL_PREFIX + 'access_token'
  static readonly LS_EXPIRES_IN: string = UnmutableConstants.LS_TOKEN_BIENESTAR_ANIMAL_PREFIX + 'expiresIn'

  /**
   * Timeout for location requests in milliseconds.
   * This is used to set the maximum time to wait for a location response.
   * If the location is not retrieved within this time, an error will be thrown.
   * @author dgutierrez
   */
  static readonly LOCATION_TIMEOUT_MS = 10000;

  /**
   * Maximum age of the location in milliseconds.
   * This is used to determine how old the cached location can be before it is considered stale.
   * A value of 0 means that the location should always be fresh and not cached.
   * @author dgutierrez
   */
  static readonly LOCATION_MAX_AGE = 0;

  static readonly IMAGE_QUALITY: number = 50

  // ==================================================================
  // ROUTES FOR SECURITY/AUTH SERVICES
  // ==================================================================
  private static readonly AUTH_URL: string = '/auth'
  static readonly AUTH_SOCIAL_URL: string = UnmutableConstants.AUTH_URL + '/social';
  static readonly AUTH_LOGIN_URL: string = UnmutableConstants.AUTH_URL + '/login'
  static readonly AUTH_SIGN_UP_URL: string = UnmutableConstants.AUTH_URL + '/signup'
  static readonly AUTH_SOCIAL_SUCCESS_URL: string = UnmutableConstants.AUTH_SOCIAL_URL + '/success'
  static readonly AUTH_SOCIAL_COMPLETE_USER_PROFILE_URL: string = UnmutableConstants.AUTH_SOCIAL_URL + '/complete-profile'
  static readonly REQUEST_PASSWORD_CHANGE_URL: string = '/requestPasswordChange'
  static readonly URL_AUTH_WITH_GOOGLE: string = "http://localhost:8080/oauth2/authorization/google"

  // ==================================================================
  // ROUTES FOR USERS SERVICES
  // =================================================================
  private static readonly USERS: string = '/users'
  static readonly USERS_URL: string = UnmutableConstants.USERS;
  static readonly FORGOT_PASSWORD_URL: string = UnmutableConstants.USERS + '/password/forgot-password';
  static readonly CHANGE_PASSWORD_URL: string = UnmutableConstants.USERS + '/password/password-reset';

  // ==================================================================
  // ROUTES FOR ADMIN SERVICES
  // =================================================================
  private static readonly ADMIN: string = '/admin'
  static readonly ADMIN_REGISTER_USER_URL: string = UnmutableConstants.ADMIN;

  // ==================================================================
  // ROUTES FOR INTEREST SERVICES
  // =================================================================
  private static readonly INTERESTS: string = '/interests'
  static readonly INTERESTS_URL: string = UnmutableConstants.INTERESTS;

  // ==================================================================
  // ROUTES FOR ROLE SERVICES
  // =================================================================
  private static readonly ROLES: string = '/roles'
  static readonly ROLES_URL: string = UnmutableConstants.ROLES;

  // ==================================================================
  // ROUTES FOR MUNICIPALITY SERVICES
  // =================================================================
  private static readonly MUNICIPALITIES: string = '/municipalities'
  static readonly MUNICIPALITIES_URL: string = UnmutableConstants.MUNICIPALITIES;

  // ==================================================================
  // ROUTES FOR MUNICIPALITY SERVICES
  // =================================================================
  private static readonly MUNICIPALITIES_STATUS: string = "/municipality-statuses";
  static readonly MUNICIPALITIES_STATUS_URL: string = UnmutableConstants.MUNICIPALITIES_STATUS;

  // USER

  //Canton, District, Neighborhood

  // ==================================================================
  // ROUTES FOR CANTON SERVICES
  // =================================================================
  private static readonly CANTONS: string = '/cantons'
  static readonly CANTONS_URL: string = UnmutableConstants.CANTONS;

  // ==================================================================
  // ROUTES FOR DISTRICT SERVICES
  // =================================================================
  private static readonly DISTRICTS: string = '/districts'
  static readonly DISTRICTS_URL: string = UnmutableConstants.DISTRICTS;

  // ==================================================================
  // ROUTES FOR NEIGHBORHOOD SERVICES
  // =================================================================
  private static readonly NEIGHBORHOODS: string = '/neighborhoods'
  static readonly NEIGHBORHOODS_URL: string = UnmutableConstants.NEIGHBORHOODS;


  // ==================================================================
  // ROUTES FOR RACES SERVICES
  // =================================================================
  private static readonly RACES: string = '/races';
  static readonly RACES_URL: string = UnmutableConstants.RACES;

  // ==================================================================
  // ROUTES FOR COMMUNITY ANIMALS SERVICES
  // =================================================================
  private static readonly COMMUNITY_ANIMALS: string = '/community-animals';
  static readonly COMMUNITY_ANIMALS_URL: string = UnmutableConstants.COMMUNITY_ANIMALS;

  /**
   * Endpoint to get the animals related to the user connected
   */
  static readonly COMMUNITY_ANIMALS_MINE: string = UnmutableConstants.COMMUNITY_ANIMALS + '/mine';

  // ==================================================================
  // ROUTES FOR ABANDONED ANIMALS SERVICES
  // =================================================================
  private static readonly ANIMALS_ABANDONED: string = '/animals/abandoned';
  static readonly ANIMALS_ABANDONED_URL: string = UnmutableConstants.ANIMALS_ABANDONED;

  // ==================================================================
  // ROUTES FOR SPECIES SERVICES
  // =================================================================
  private static readonly SPECIES: string = '/species';
  static readonly SPECIES_URL: string = UnmutableConstants.SPECIES;

  // ==================================================================
  // ROUTES FOR ANIMAL TYPES SERVICES
  // =================================================================
  private static readonly ANIMAL_TYPES: string = '/animal-types';

  static readonly ANIMAL_TYPES_URL: string = UnmutableConstants.ANIMAL_TYPES;
// ==================================================================
  // ROUTES FOR ANIMAL RECORDS SERVICES
  // =================================================================
  private static readonly ANIMAL_RECORDS: string = '/animals/records';
  static readonly ANIMAL_RECORDS_URL: string = UnmutableConstants.ANIMAL_RECORDS;
  static readonly COMMUNITY_ANIMAL_RECORDS: string = UnmutableConstants.ANIMAL_RECORDS + '/community';
  static readonly ABANDONED_ANIMAL_RECORDS: string = UnmutableConstants.ANIMAL_RECORDS + '/abandoned';

  // ==================================================================
  // ROUTES FOR SEX SERVICES
  // =================================================================
  private static readonly SEX: string = '/sex';
  static readonly SEX_URL: string = UnmutableConstants.SEX;

  // ==================================================================
  // ROUTES FOR VACCINE SERVICES
  // =================================================================
  private static readonly VACCINES: string = '/vaccines';
  static readonly VACCINE_URL: string = UnmutableConstants.VACCINES;
  static readonly VACCINE_BY_SPECIES_URL: string = 'by-species';

  // ==================================================================
  // ROUTES FOR SANITARY CONTROL RESPONSES SERVICES
  // =================================================================
  private static readonly SANITARY_CONTROL_RESPONSES: string = '/sanitary-control-responses';
  static readonly SANITARY_CONTROL_RESPONSES_URL: string = UnmutableConstants.SANITARY_CONTROL_RESPONSES;

  // ==================================================================
  // ROUTES FOR SANITARY CONTROL TYPE SERVICES
  // =================================================================
  private static readonly SANITARY_CONTROL_TYPES: string = '/sanitary-control-types';
  static readonly SANITARY_CONTROL_TYPES_URL: string = UnmutableConstants.SANITARY_CONTROL_TYPES;

  // ==================================================================
  // ROUTES FOR MODEL 3D ANIMAL SERVICES
  // =================================================================
  private static readonly MODEL_3D_ANIMAL: string = '/model3d-animal'
  static readonly MODEL_3D_ANIMAL_URL: string = UnmutableConstants.MODEL_3D_ANIMAL;

  // ==================================================================
  // ROUTES FOR MODEL NOTIFICATION SERVICES
  // =================================================================
  private static readonly NOTIFICATIONS: string = '/notifications';
  static readonly NOTIFICATIONS_URL: string = UnmutableConstants.NOTIFICATIONS;

  // ==================================================================
  // ROUTES FOR MODEL MUNICIPALITY NOTIFICATION RULES SERVICES
  // =================================================================
  private static readonly MUNICIPAL_PREVENTIVE_CARE_CONFIGURATIONS: string = '/municipal-preventive-care-configurations';
  static readonly MUNICIPAL_PREVENTIVE_CARE_CONFIGURATIONS_URL = UnmutableConstants.MUNICIPAL_PREVENTIVE_CARE_CONFIGURATIONS;

  // ==================================================================
  // ROUTES FOR MODEL ANNOUNCEMENT STATES SERVICES
  // =================================================================
  private static readonly ANNOUNCEMENT_STATES: string = '/announcement-states';
  static readonly ANNOUNCEMENT_STATES_URL: string = UnmutableConstants.ANNOUNCEMENT_STATES;

  // ==================================================================
  // ROUTES FOR MODEL ANNOUNCEMENTS SERVICES
  // =================================================================
  private static readonly ANNOUNCEMENTS: string = '/announcements';
  static readonly ANNOUNCEMENTS_URL: string = UnmutableConstants.ANNOUNCEMENTS

  // ==================================================================
  // ROUTES FOR MODEL COMPLAINTS SERVICES
  // =================================================================
  private static readonly COMPLAINTS: string = '/complaints';
  static readonly COMPLAINTS_URL: string = UnmutableConstants.COMPLAINTS;

  // ==================================================================
  // ROUTES FOR MODEL COMPLAINTS SERVICES
  // =================================================================
  private static COMPLAINT_TYPES: string = '/complaint-types';
  static readonly COMPLAINT_TYPES_URL: string = UnmutableConstants.COMPLAINT_TYPES;

  // ==================================================================
  // ROUTES FOR MODEL COMPLAINT STATES SERVICES
  // =================================================================
  private static COMPLAINT_STATES: string = '/complaint-states';
  static readonly COMPLAINT_STATES_URL: string = UnmutableConstants.COMPLAINT_STATES;
}
