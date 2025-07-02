import {inject, Injectable} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material/snack-bar';
import {AlertOptions} from '@common/interfaces';
import {AlertTypeEnum} from '@common/enums';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private readonly snackBar = inject(MatSnackBar);

  /**
   * Displays a snackbar alert using Angular Material.
   * If no message is provided, a default message is chosen based on the type.
   *
   * @param options Configuration options for the alert.
   * @author dgutierrez
   */
  displayAlert(options: AlertOptions): void {
    const {
      type = AlertTypeEnum.ERROR,
      message,
      duration = 3000,
      horizontalPosition = 'center',
      verticalPosition = 'top',
      panelClass
    } = options;

    const finalMessage = message ?? this.getDefaultMessage(type);
    const finalPanelClass = panelClass ?? [this.getPanelClass(type)];

    const config: MatSnackBarConfig = {
      duration,
      horizontalPosition,
      verticalPosition,
      panelClass: finalPanelClass,
    };

    this.snackBar.open(finalMessage, 'Cerrar', config);
  }

  /**
   * Returns a default message based on the alert type.
   *
   * @param type The type of alert
   * @returns The default message associated with the alert type
   * @author dgutierrez
   */
  private getDefaultMessage(type: AlertTypeEnum): string {
    switch (type) {
      case AlertTypeEnum.SUCCESS:
        return 'Operation completed successfully';
      case AlertTypeEnum.ERROR:
        return 'An error occurred, please try again later';
      case AlertTypeEnum.INFO:
        return 'Here is some information';
      case AlertTypeEnum.WARNING:
        return 'Warning: Please check the data';
      default:
        return 'Notification';
    }
  }

  /**
   * Returns a default CSS class based on alert type.
   *
   * @param type The type of alert
   * @returns The corresponding CSS class for the alert style
   * @author dgutierrez
   */
  private getPanelClass(type: AlertTypeEnum): string {
    return `${type}-snackbar`; // e.g., 'error-snackbar'
  }
}
