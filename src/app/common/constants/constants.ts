import {UnmutableConstants} from './unmutable-constants';
import {ChangeDetectionStrategy} from '@angular/core';

/**
 * Class that defines constant, read-only variables that change according to the environment!
 * Inherits from UnmutableConstants which contains variables that DO NOT change according to the environment
 *
 * CONSTANTS FOR TESTING (can be copied and pasted into constants.ts, and uncomment the export of the class there)
 * @author dgutierrez
 */
export class Constants extends UnmutableConstants {
  static readonly appHost: string = 'http://localhost:8080'

  static readonly apiBaseUrl: string =
    Constants.appHost;

  // ==================================================================
  // Change detection strategy
  // =================================================================
  static readonly changeDetectionStrategy: ChangeDetectionStrategy.OnPush =
    ChangeDetectionStrategy.OnPush

  /**
   * Enables console.log for API and services
   * Used for debugging purposes
   */
  static readonly debugMode: boolean = true
  /**
   * Endpoint for create 3D Model
   * @author nav
   */
  static readonly createTaskV25: string = '/model3d-animal/createTaskV25';

  /**
   * Endpoint to get the animals related to the user connected
   */
  static readonly communityAnimalsMine: string  = '/community-animals/mine';
}
