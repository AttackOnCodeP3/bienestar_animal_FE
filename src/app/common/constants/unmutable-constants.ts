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


  // ==================================================================
  // Identifiers for local storage
  // ==================================================================
  private static readonly LS_TOKEN_BIENESTAR_ANIMAL_PREFIX: string = 'LS_BienestarAnimal_AppMovil_'
  static readonly LS_TOKEN_BIENESTAR_ANIMAL: string = UnmutableConstants.LS_TOKEN_BIENESTAR_ANIMAL_PREFIX + 'token'

  static readonly LS_USER_DATA_ID: string = UnmutableConstants.LS_TOKEN_BIENESTAR_ANIMAL_PREFIX + 'userDataId'

  static readonly LS_APP_PREFERENCE_PREFIX: string = UnmutableConstants.LS_TOKEN_BIENESTAR_ANIMAL_PREFIX + 'app-preference-'
  static readonly LS_APP_PREFERENCE_SCHEME: string = UnmutableConstants.LS_TOKEN_BIENESTAR_ANIMAL_PREFIX + UnmutableConstants.LS_APP_PREFERENCE_PREFIX + 'scheme'
  static readonly LS_APP_PREFERENCE_LANGUAGE: string = UnmutableConstants.LS_TOKEN_BIENESTAR_ANIMAL_PREFIX + UnmutableConstants.LS_APP_PREFERENCE_PREFIX + 'language'

  static readonly IMAGE_QUALITY: number = 50


  // ==================================================================
  // PARTIAL ROUTES FOR SERVICES
  // ==================================================================

  // ==================================================================
  // ROUTES FOR SECURITY/AUTH SERVICES
  // ==================================================================
  private static readonly SECURITY: string = '/security'
  static readonly AUTH_URL: string = UnmutableConstants.SECURITY + '/auth'
  static readonly REQUEST_PASSWORD_CHANGE_URL: string =
    UnmutableConstants.SECURITY + '/requestPasswordChange'

  // ==================================================================
  // ROUTES FOR COMPANION ANIMAL SERVICES
  // =================================================================
  private static readonly COMPANION_ANIMAL: string = '/CompanionAnimal'
  static readonly REGISTER_COMPANION_ANIMAL_URL: string = UnmutableConstants.COMPANION_ANIMAL + '/registerCompanionAnimal'
}
