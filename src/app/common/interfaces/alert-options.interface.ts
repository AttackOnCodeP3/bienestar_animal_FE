import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {AlertTypeEnum} from '@common/enums';

/**
 * Interface for alert display options.
 * @author dgutierrez
 */
export interface AlertOptions {
  /**
   * Type of alert to display.
   * By default, it is set to 'error'.
   */
  type?: AlertTypeEnum;
  /**
   * Key for the message to display, used for internationalization.
   */
  messageKey?: string;
  /**
   * Plain message to display.
   */
  message?: string;

  /**
   * Parameters for the message, used for internationalization.
   * @example
   *  "The user {username} has been created successfully."
   *   This will replace placeholders in the message string.
   *   @author dgutierrez
   */
  parameter?: string;
  duration?: number;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
  panelClass?: string[];
}
