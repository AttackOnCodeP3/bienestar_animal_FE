import {ICoordinates} from '@common/interfaces/coordinates.interface';

/**
 * Interface for the result of a location request.
 * Provides detailed information about success or failure,
 * including coordinates, a possible error object, and descriptive messages.
 */
export interface ILocationResult {
  success: boolean;
  coordinates?: ICoordinates;
  error?: GeolocationPositionError | Error;
  errorMessage: string;
  errorCode?: number;
}
