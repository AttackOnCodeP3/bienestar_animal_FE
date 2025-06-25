import {UnmutableConstants} from './unmutable-constants';

/**
 * Class that defines constant, read-only variables that change according to the environment!
 * Inherits from UnmutableConstants which contains variables that DO NOT change according to the environment
 *
 * CONSTANTS FOR TESTING (can be copied and pasted into constants.ts, and uncomment the export of the class there)
 * @author dgutierrez
 */
/*export */  class Constants extends UnmutableConstants {

  static readonly appHost: string = "https://desarrollo.atack_on_code.cr/";
  
  static readonly apiBaseUrl: string = Constants.appHost + "BienestarAnimalWS/api/launion";
}
