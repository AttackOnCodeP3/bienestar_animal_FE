import { Injectable } from '@angular/core';
import { ILocationResult } from '@common/interfaces';
import {Constants} from '@common/constants/constants';

/**
 * Service responsible for obtaining the user's geographic location.
 * Uses the browser's Geolocation API to retrieve latitude and longitude.
 * Handles all possible errors, providing clear messages and a default value.
 *
 * @example
 * const result = await locationService.getUserLocation();
 * if (result.success) {
 *   console.log('Location:', result.coordinates.latitude, result.coordinates.longitude);
 * } else {
 *   console.error('Error:', result.errorMessage);
 * }
 *
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  /**
   * Gets the user's current geographic coordinates.
   * Returns a detailed result indicating success or the type of error.
   *
   * @returns {Promise<ILocationResult>} A Promise resolved with an ILocationResult object.
   * @author dgutierrez
   */
  async getUserLocation(): Promise<ILocationResult> {
    try {
      const position = await this.requestUserLocation();
      return {
        success: true,
        coordinates: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        errorMessage: 'Location successfully retrieved.'
      };
    } catch (error) {
      return this.handleLocationError(error);
    }
  }

  /**
   * Requests the user's location using the browser's Geolocation API.
   * This method is internal and returns a promise resolved with the position
   * if permission is granted, or rejected with an error otherwise.
   *
   * @returns {Promise<GeolocationPosition>} A Promise resolved with the user's current position.
   * @throws {Error} If geolocation is not supported or permission is denied/unavailable.
   * @author dgutierrez
   */
  private requestUserLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        {
          enableHighAccuracy: true,
          timeout: Constants.LOCATION_TIMEOUT_MS,
          maximumAge: Constants.LOCATION_MAX_AGE
        }
      );
    });
  }

  /**
   * Handles specific GeolocationPositionError and general errors.
   * Maps error codes to descriptive messages for the user.
   *
   * @param error The thrown error object (GeolocationPositionError or Error).
   * @returns {ILocationResult} An ILocationResult object indicating failure and error details.
   * @author dgutierrez
   */
  private handleLocationError(error: unknown): ILocationResult {
    let errorMessage: string;
    let errorCode: number | undefined;
    let originalError: GeolocationPositionError | Error | undefined;

    if (error instanceof GeolocationPositionError) {
      originalError = error;
      errorCode = error.code;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'User denied permission to access location. Please enable it in your browser settings.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable (e.g., weak GPS signal). Ensure you have good signal or internet connection.';
          break;
        case error.TIMEOUT:
          errorMessage = 'The request to get location timed out. Please try again.';
          break;
        default:
          errorMessage = `An unknown error occurred while trying to get location (Code: ${error.code}).`;
          break;
      }
    } else if (error instanceof Error) {
      originalError = error;
      errorMessage = `Error: ${error.message}. Please check if your browser supports geolocation.`;
    } else {
      errorMessage = 'An unexpected error occurred while obtaining location.';
    }

    return {
      success: false,
      coordinates: { latitude: 0, longitude: 0 },
      errorMessage: errorMessage,
      error: originalError,
      errorCode: errorCode
    };
  }
}
