import {inject, Injectable} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material/snack-bar';
import {AlertOptions} from '@common/interfaces';
import {AlertPanelClassEnum, AlertTypeEnum} from '@common/enums';
import {I18nService} from '@services/general';
import {I18nMessagesEnum} from '@common/enums/i18n';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private readonly snackBar = inject(MatSnackBar);
  private readonly i18nService = inject(I18nService);

  /**
   * Displays a snackbar alert using Angular Material.
   * Prioritizes i18n translation if messageKey is provided.
   * Falls back to plain message or default translated message based on alert type.
   *
   * @param options Configuration options for the alert.
   * @author dgutierrez
   */
  async displayAlert(options: AlertOptions): Promise<void> {
    const {
      type = AlertTypeEnum.ERROR,
      messageKey,
      message,
      parameter,
      duration = 5000,
      horizontalPosition = 'end',
      verticalPosition = 'bottom',
      panelClass,
    } = options;

    let finalMessage: string;

    if (messageKey && this.i18nService.has(messageKey)) {
      finalMessage = await this.i18nService.get(messageKey, parameter);
    } else if (messageKey) {
      finalMessage = messageKey;
    } else if (message) {
      finalMessage = message;
    } else {
      const defaultKey = this.getDefaultMessageKey(type);
      finalMessage = await this.i18nService.get(defaultKey);
    }

    const finalPanelClass = panelClass ?? this.getPanelClassFromType(type);

    const config: MatSnackBarConfig = {
      duration,
      horizontalPosition,
      verticalPosition,
      panelClass: finalPanelClass,
    };

    const buttonLabelTranslated = await this.i18nService.get(this.i18nService.i18nButtonsEnum.BUTTON_CLOSE);

    this.snackBar.open(finalMessage, buttonLabelTranslated, config);
  }

  /**
   * Returns the default i18n key for each alert type.
   * This key will be translated before being displayed.
   *
   * @param type The type of alert.
   * @returns The i18n key associated with the given alert type.
   * @author dgutierrez
   */
  private getDefaultMessageKey(type: AlertTypeEnum): string {
    switch (type) {
      case AlertTypeEnum.SUCCESS:
        return I18nMessagesEnum.MAT_SNACK_HTTP_OPERATION_COMPLETED_SUCCESSFULLY;
      case AlertTypeEnum.ERROR:
        return I18nMessagesEnum.MAT_SNACK_HTTP_AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN;
      case AlertTypeEnum.INFO:
        return I18nMessagesEnum.MAT_SNACK_HTTP_HERE_IS_SOME_INFORMATION;
      case AlertTypeEnum.WARNING:
        return I18nMessagesEnum.MAT_SNACK_HTTP_WARNING_PLEASE_CHECK_THE_DATA;
      default:
        return I18nMessagesEnum.MAT_SNACK_HTTP_NOTIFICATION;
    }
  }

  /**
   * Returns the panel class based on the alert type.
   * @param type The type of alert.
   * @author dgutierrez
   */
  private getPanelClassFromType(type: AlertTypeEnum): string {
    switch (type) {
      case AlertTypeEnum.SUCCESS:
        return AlertPanelClassEnum.SUCCESS;
      case AlertTypeEnum.INFO:
        return AlertPanelClassEnum.INFO;
      case AlertTypeEnum.WARNING:
        return AlertPanelClassEnum.WARNING;
      case AlertTypeEnum.ERROR:
      default:
        return AlertPanelClassEnum.ERROR;
    }
  }
}
