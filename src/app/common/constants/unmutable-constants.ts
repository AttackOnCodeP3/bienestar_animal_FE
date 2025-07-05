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
  static readonly REQUEST_PASSWORD_CHANGE_URL: string ='/requestPasswordChange'
  static readonly URL_AUTH_WITH_GOOGLE: string = "http://localhost:8080/oauth2/authorization/google"

  // ==================================================================
  // ROUTES FOR USERS SERVICES
  // =================================================================
  private static readonly USERS: string = '/users'

  // ==================================================================
  // ROUTES FOR INTEREST SERVICES
  // =================================================================
  private static readonly INTERESTS: string = '/interests'
  static readonly GET_ALL_INTERESTS_URL: string = UnmutableConstants.INTERESTS;

  // ==================================================================
  // ROUTES FOR MUNICIPALITY SERVICES
  // =================================================================
  private static readonly MUNICIPALITIES: string = '/municipalities'
  static readonly GET_ALL_MUNICIPALITIES_URL: string = UnmutableConstants.MUNICIPALITIES;

  //Canton, District, Neighborhood

  // ==================================================================
  // ROUTES FOR CANTON SERVICES
  // =================================================================
  private static readonly CANTONS: string = '/cantons'
  static readonly GET_ALL_CANTONS_URL: string = UnmutableConstants.CANTONS;

  // ==================================================================
  // ROUTES FOR DISTRICT SERVICES
  // =================================================================
  private static readonly DISTRICTS: string = '/districts'
  static readonly GET_ALL_DISTRICTS_URL: string = UnmutableConstants.DISTRICTS;

  // ==================================================================
  // ROUTES FOR NEIGHBORHOOD SERVICES
  // =================================================================
  private static readonly NEIGHBORHOODS: string = '/neighborhoods'
  static readonly GET_ALL_NEIGHBORHOODS_URL: string = UnmutableConstants.NEIGHBORHOODS;
}
