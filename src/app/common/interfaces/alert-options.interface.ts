import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {AlertTypeEnum} from '@common/enums';


/**
 * Interface for alert display options.
 * @author dgutierrez
 */
export interface AlertOptions {
  type?: AlertTypeEnum;
  message?: string;
  duration?: number;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
  panelClass?: string[];
}
