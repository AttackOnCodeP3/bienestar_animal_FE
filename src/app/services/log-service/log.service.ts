import { Injectable } from '@angular/core';
import {IDebugOptions} from '@common/interfaces';
import {Constants} from '@common/constants/constants';

/**
 * Service for handling debug logging functionality
 * Provides methods to log debug information with various configuration options
 *
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class LogService {
  /**
   * Log levels for different types of messages
   */
  private readonly LOG_LEVELS = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR'
  };

  /**
   * Core logging function that handles all log operations
   *
   * @param {IDebugOptions<T>} options - Configuration object for logging
   * @param {boolean} isDebugEnabled - Boolean value indicating whether the log should be printed
   * @param {string} level - Log level (DEBUG, INFO, WARN, ERROR)
   * @returns {void}
   * @author dgutierrez
   */
  private logCore<T>(options: IDebugOptions<T>, isDebugEnabled: boolean, level: string = this.LOG_LEVELS.DEBUG): void {
    // Early return if debug is disabled
    if (!isDebugEnabled) {
      return;
    }

    const { message, className, lineBreak = false, error, data } = options;

    // Create a prefix with the log level and class name if provided
    const prefix = className ? `[${level}] ${className}:` : `[${level}]`;

    // Handle errors with enhanced error logging
    if (error) {
      console.error(`${prefix} Error:`, error);
      console.trace();
    }

    // Select the appropriate console method based on log level
    const logMethod = this.getConsoleMethod(level);

    // Log the message with appropriate formatting
    if (lineBreak) {
      logMethod(prefix);
      logMethod(message);
    } else {
      logMethod(prefix, message);
    }

    // Log additional data if provided
    if (data !== undefined) {
      logMethod(`${prefix} Data:`, data);
    }
  }

  /**
   * Returns the appropriate console method based on the log level
   *
   * @param {string} level - Log level (DEBUG, INFO, WARN, ERROR)
   * @returns {Function} - Console method to use for logging
   * @author dgutierrez
   */
  private getConsoleMethod(level: string): Function {
    switch (level) {
      case this.LOG_LEVELS.DEBUG:
        return console.debug;
      case this.LOG_LEVELS.INFO:
        return console.info;
      case this.LOG_LEVELS.WARN:
        return console.warn;
      case this.LOG_LEVELS.ERROR:
        return console.error;
      default:
        return console.log;
    }
  }

  /**
   * Prints debug messages to console only if debug mode is enabled
   *
   * @param {IDebugOptions<T>} options - Configuration object for logging
   * @param isDebugEnabled - Boolean value indicating whether debug mode is enabled
   * @returns {void}
   * @author dgutierrez
   */
  private logDebug<T>(options: IDebugOptions<T>, isDebugEnabled: boolean): void {
    this.logCore<T>(options, isDebugEnabled, this.LOG_LEVELS.DEBUG);
  }

  /**
   * Prints debug messages to console only if the application is in debug mode
   *
   * @param {IDebugOptions<T>} options - Configuration object for logging
   * @returns {void}
   * @author dgutierrez
   */
  debug<T>(options: IDebugOptions<T>): void {
    this.logDebug<T>(options, Constants.debugMode);
  }

  /**
   * Prints info messages to console only if the application is in debug mode
   *
   * @param {IDebugOptions<T>} options - Configuration object for logging
   * @returns {void}
   * @author dgutierrez
   */
  info<T>(options: IDebugOptions<T>): void {
    this.logCore<T>(options, Constants.debugMode, this.LOG_LEVELS.INFO);
  }

  /**
   * Prints warning messages to console only if the application is in debug mode
   *
   * @param {IDebugOptions<T>} options - Configuration object for logging
   * @returns {void}
   * @author dgutierrez
   */
  warn<T>(options: IDebugOptions<T>): void {
    this.logCore<T>(options, Constants.debugMode, this.LOG_LEVELS.WARN);
  }

  /**
   * Prints error messages to console (always enabled regardless of debug mode)
   *
   * @param {IDebugOptions<T>} options - Configuration object for logging
   * @returns {void}
   * @author dgutierrez
   */
  error<T>(options: IDebugOptions<T>): void {
    // Errors are always logged regardless of debug mode
    this.logCore<T>(options, true, this.LOG_LEVELS.ERROR);
  }
}
