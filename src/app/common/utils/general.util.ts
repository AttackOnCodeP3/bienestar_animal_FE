/**
 * Utility class for general-purpose functions.
 * @author dgutierrez
 */
export abstract class GeneralUtil {
  /**
   * Formats a date to a string in the format 'YYYY-MM-DD'.
   * @param date The date to format, can be a Date object or an ISO string.
   * @author dgutierrez
   */
  static formatDateOnly = (date: Date | string): string =>
    typeof date === 'string'
      ? date.split('T')[0]
      : date.toISOString().split('T')[0];
}
