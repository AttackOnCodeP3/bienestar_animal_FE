import {Injectable} from '@angular/core';

/**
 * Service for performing validations on various data types.
 * Provides methods to check if a value is defined (not null or undefined).
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class ValidationsService {
  /**
   * Checks if a value is defined (not null or undefined).
   * @param value The value to check.
   * @returns True if the value is defined, false otherwise.
   * @author dgutierrez
   */
  isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }
}
